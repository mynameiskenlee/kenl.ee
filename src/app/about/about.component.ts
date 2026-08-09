import { Component, OnInit } from '@angular/core';
import { faGithubSquare, faLinkedin, faHackerrank, faInstagramSquare, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { cibLeetcode } from '@coreui/icons';
import content from '../../content/site.json';

interface SocialLink {
  label: string;
  url: string;
  faIcon?: IconDefinition;
  ciIcon?: string | string[];
}

const FA_ICONS: Record<string, IconDefinition> = {
  github: faGithubSquare,
  linkedin: faLinkedin,
  hackerrank: faHackerrank,
  instagram: faInstagramSquare,
};

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false
})
export class AboutComponent implements OnInit {
  name = content.site.name;
  role = content.site.role;
  focus = content.site.focus;
  socials: SocialLink[] = content.site.social.map(link => ({
    label: link.label,
    url: link.url,
    faIcon: FA_ICONS[link.icon],
    ciIcon: link.icon === 'leetcode' ? cibLeetcode : undefined,
  }));

  constructor() { }

  ngOnInit(): void {
  }

}
