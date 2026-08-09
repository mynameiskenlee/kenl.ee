import { Component, OnInit } from '@angular/core';
import content from '../../content/site.json';

interface Experience {
  company: string;
  location: string;
  title: string;
  period: string;
  descriptions: string[];
  expanded?: boolean;
}

interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  descriptions: string[];
  expanded?: boolean;
}

interface Project {
  title: string;
  link: string;
  technologies: string;
  period: string;
  descriptions: string[];
  expanded?: boolean;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  standalone: false
})
export class ExperienceComponent implements OnInit {

  experiences: Experience[] = structuredClone(content.experiences);

  educations: Education[] = structuredClone(content.educations);

  projects: Project[] = structuredClone(content.projects);

  constructor() { }

  ngOnInit(): void {
  }

  toggleItem(item: any): void {
    item.expanded = !item.expanded;
  }

}
