import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'parse5';
import { credentials, experience, profile } from '../src/data/profile.ts';

const origin = 'https://ragunathanbarasu.com';
const routes = ['/', '/work/kubernetes-automation/', '/work/observability/', '/work/cloud-cost-optimization/', '/work/delivery-automation/'];
const fileFor = (route) => join('dist', route === '/' ? 'index.html' : `${route.slice(1)}index.html`);
const attr = (node, name) => node.attrs?.find((attribute) => attribute.name === name)?.value;
function nodes(node) { return [node, ...(node.childNodes ?? []).flatMap(nodes)]; }
function text(node) { return node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join(' '); }
const documents = new Map(await Promise.all(routes.map(async (route) => [route, parse(await readFile(fileFor(route), 'utf8'))])));

test('every page ships meaningful HTML, unique metadata, and no application JavaScript', () => {
  const titles = new Set();
  for (const [route, document] of documents) {
    const elements = nodes(document);
    assert.equal(elements.filter((node) => node.tagName === 'h1').length, 1, route);
    assert.ok(elements.some((node) => node.tagName === 'main' && attr(node, 'id') === 'main'), route);
    const title = text(elements.find((node) => node.tagName === 'title')).trim();
    assert.ok(title.includes('Ragunath Anbarasu'), route);
    titles.add(title);
    assert.ok(elements.some((node) => attr(node, 'name') === 'description' && attr(node, 'content')?.length > 60), route);
    assert.ok(elements.some((node) => attr(node, 'rel') === 'canonical' && attr(node, 'href') === `${origin}${route}`), route);
    assert.ok(elements.some((node) => attr(node, 'property') === 'og:image' && attr(node, 'content') === `${origin}/images/social-preview.png`), route);
    assert.equal(elements.filter((node) => node.tagName === 'script' && attr(node, 'type') !== 'application/ld+json').length, 0, route);
    assert.equal(elements.filter((node) => node.tagName === 'form' || node.tagName === 'iframe').length, 0, route);
    assert.ok(!elements.some((node) => attr(node, 'href')?.startsWith('mailto:')), `Unexpected email link on ${route}`);
    assert.ok(!/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(text(document)), `Unexpected public email address on ${route}`);
    assert.ok(!text(document).includes('$'), `Unexpected public dollar figure on ${route}`);
  }
  assert.equal(titles.size, routes.length);
});

test('internal links, anchors, and local images resolve on every page', async () => {
  for (const [route, document] of documents) {
    const elements = nodes(document);
    const ids = elements.map((node) => attr(node, 'id')).filter(Boolean);
    assert.equal(new Set(ids).size, ids.length, `Duplicate IDs on ${route}`);
    for (const node of elements) {
      if (node.tagName === 'a') {
        const href = attr(node, 'href');
        assert.ok(href?.trim(), `Empty link on ${route}`);
        assert.ok(!nodes(node).slice(1).some((child) => child.tagName === 'a'), `Nested link on ${route}`);
        const url = new URL(href, `${origin}${route}`);
        if (url.origin === origin) {
          assert.ok(documents.has(url.pathname), `Missing route: ${href} on ${route}`);
          if (url.hash) assert.ok(nodes(documents.get(url.pathname)).some((candidate) => attr(candidate, 'id') === url.hash.slice(1)), `Missing anchor: ${href}`);
        }
      }
      if (node.tagName === 'img') {
        assert.ok(attr(node, 'alt')?.trim(), 'Images must have useful descriptions');
        assert.ok(attr(node, 'width') && attr(node, 'height'), 'Images must reserve layout space');
        const src = attr(node, 'src');
        await access(join('dist', src.slice(1)));
      }
    }
  }
});

test('legacy anchors and five resume roles remain available with LinkedIn-only contact', () => {
  const homepage = documents.get('/');
  const elements = nodes(homepage);
  for (const id of ['about', 'projects', 'skills', 'testimonials', 'contact', 'experience', 'certifications']) assert.ok(elements.some((node) => attr(node, 'id') === id), id);
  for (const job of experience) {
    assert.ok(text(homepage).includes(job.title), job.title);
    assert.ok(text(homepage).includes(`${job.start} – ${job.end}`), job.title);
  }
  assert.equal(elements.filter((node) => attr(node, 'class') === 'job').length, 5);
  const contact = elements.find((node) => attr(node, 'id') === 'contact');
  const contactLinks = nodes(contact).filter((node) => node.tagName === 'a');
  assert.equal(contactLinks.length, 1);
  assert.equal(attr(contactLinks[0], 'href'), profile.linkedin);
  assert.ok(text(contactLinks[0]).includes('Connect on LinkedIn'));
});

test('certifications link to earned badges and preserve date-only issue and expiry values', () => {
  const elements = nodes(documents.get('/'));
  for (const credential of credentials) {
    assert.ok(elements.some((node) => attr(node, 'href') === `https://www.credly.com/badges/${credential.badgeId}`), credential.acronym);
    const article = elements.find((node) => node.tagName === 'article' && nodes(node).some((child) => attr(child, 'src') === credential.image));
    assert.ok(article, credential.acronym);
    const dates = nodes(article).filter((node) => node.tagName === 'time').map((node) => attr(node, 'datetime'));
    assert.deepEqual(dates, [credential.issued, credential.expires], credential.acronym);
    assert.ok(!/\bactive\b/i.test(text(article)), 'Credential status must not become stale');
  }
  const cka = credentials.find((credential) => credential.acronym === 'CKA');
  assert.equal(cka.expires, '2026-11-10');
});

test('work summaries are concise, include context, and preserve distinct metrics', () => {
  for (const [route, document] of documents) {
    if (route === '/') continue;
    const elements = nodes(document);
    const prose = elements.find((node) => attr(node, 'class') === 'prose');
    const wordCount = text(prose).trim().split(/\s+/).length;
    assert.ok(wordCount >= 150 && wordCount <= 250, `${route}: ${wordCount} words`);
    assert.deepEqual(nodes(prose).filter((node) => node.tagName === 'h2').map((node) => text(node).trim()), ['The challenge', 'My contribution', 'The result']);
  }
  const delivery = text(documents.get('/work/delivery-automation/'));
  assert.ok(delivery.includes('February 2023 to August 2025'));
  assert.ok(delivery.includes('beginning in August 2025'));
  assert.ok(delivery.includes('faster PR validation') && delivery.includes('deployment effort'));
  assert.ok(text(documents.get('/work/cloud-cost-optimization/')).includes('approximately 69%'));
});

test('404 is separate, excluded from indexing, and Netlify serves real static routes', async () => {
  const document = parse(await readFile('dist/404.html', 'utf8'));
  assert.ok(nodes(document).some((node) => attr(node, 'name') === 'robots' && attr(node, 'content') === 'noindex'));
  assert.ok(text(document).includes('Page not found'));
  const config = await readFile('netlify.toml', 'utf8');
  assert.ok(config.includes('publish = "dist"'));
  assert.ok(!config.includes('[[redirects]]'), 'Missing routes must not rewrite to the homepage');
  const sitemapFiles = (await readdir('dist')).filter((file) => /^sitemap.*\.xml$/.test(file));
  assert.ok(sitemapFiles.includes('sitemap-index.xml'));
  const sitemap = (await Promise.all(sitemapFiles.map((file) => readFile(join('dist', file), 'utf8')))).join('');
  for (const route of routes) assert.ok(sitemap.includes(`${origin}${route}`), route);
  assert.ok(!sitemap.includes(`${origin}/404`));
  assert.ok((await readFile('dist/robots.txt', 'utf8')).includes(`${origin}/sitemap-index.xml`));
});
