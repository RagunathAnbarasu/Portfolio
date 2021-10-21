import { BadgeCheckIcon, ChipIcon } from "@heroicons/react/solid";
import React from "react";
import { skills } from "../data";

export default function Skills() {
  return (
    <section id="skills">
      <div className="container px-5 py-10 mx-auto">
        <div className="text-center mb-20">
          <ChipIcon className="w-10 inline-block mb-4" />
          <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
            Skills &amp; Technologies
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            •	4+ years of development experience using C, C++, Python, Linux scripting, SQL
            •	Experienced in software development using OOP, design patterns, data structures and algorithms
            •	Working knowledge in Java, HTML, Java Script, CSS, SOAP and REST API development
            •	Tools & IDEs: Experienced with VS Code, Eclipse, MATLAB, Hive, Impala, Oozie, Microsoft office, Tableau
            •	Version control: Experienced with GIT, Bitbucket and Jira
            •	DevOps: Working knowledge in Docker, Kubernetes, and OpenStack
            •	Communication Protocols: Working knowledge in HTTP, SMTP, IPv4, TCP/IP, DHCP, OSPF, BGP, IGRP, DNS, NTP
            •	Certification : CENGN Cloud System Specialist - Linux, Docker, Kubernetes, Open stack

          </p>
        </div>
        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
          {skills.map((skill) => (
            <div key={skill} className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-800 rounded flex p-4 h-full items-center">
                <BadgeCheckIcon className="text-green-400 w-6 h-6 flex-shrink-0 mr-4" />
                <span className="title-font font-medium text-white">
                  {skill}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}