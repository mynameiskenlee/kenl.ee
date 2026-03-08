import { Component, OnInit } from '@angular/core';

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

  experiences: Experience[] = [
    {
      company: 'Deloitte Digital',
      location: 'Hong Kong',
      title: 'Consultant',
      period: 'Jul 2022 - Current',
      descriptions: [
        'A core member of the Technology & Transformation - Customer - Sales & Service Team, specializing in cutting-edge technology solutions.',
        'Drove end-to-end Flutter application development for both luxury retail and charity clients, delivering robust and user-centric mobile experiences.',
        'Engineered advanced Gen-AI solutions, including a Compliance Checking Tool and Stock Index Construction Tool, leveraging AI/ML techniques for a Major Stock Exchange with Google Gemini and Google AI.',
        'Applied expertise in prompt engineering to fine-tune and optimize large language models (LLMs) for diverse Gen-AI applications.',
        'Developed and integrated APIs for Gen-AI projects (GPT and Gemini) and contributed to innovative metaverse initiatives, demonstrating strong proficiency in API design and development.',
        'Managed the migration of a critical Customer Data Platform (CDP) from AWS to GCP, showcasing cloud platform migration expertise.',
        'Ensured software reliability and performance through rigorous software testing across multiple projects.'
      ]
    },
    {
      company: 'HSBC',
      location: 'Hong Kong',
      title: 'Assistant Manager, Innovation Technology',
      period: 'Sep 2021 - Jun 2022',
      descriptions: [
        'Operated within the Data and Architecture Office, applying expertise in data governance and architectural principles.',
        'Collaborated on a critical regional project focused on regulatory reporting and data privacy in Malaysia and Singapore, demonstrating strong understanding of international data regulations (e.g., GDPR, local privacy laws) and contributing to the successful implementation of privacy-enhancing technologies.'
      ]
    },
    {
      company: 'Pokeguide Limited',
      location: 'Hong Kong',
      title: 'Part-time Mobile Application Developer',
      period: 'Dec 2020 - Jun 2021',
      descriptions: [
        'Developed a Flutter application that enhanced data visualization by integrating Syncfusion Flutter Charts, leading to improved user understanding of statistics and charts.',
        'Successfully migrated the Pokeguide app from native Android/iOS to Flutter, improving cross-platform performance and reducing development time by 50%.'
      ]
    }
  ];

  educations: Education[] = [
    {
      degree: 'Bachelor of Science with Honours, Second Class Upper Division in Computer Science',
      institution: 'The Chinese University of Hong Kong',
      location: 'Hong Kong',
      period: 'Sep 2018 - Jul 2021',
      descriptions: [
        'Awarded the Faculty of Engineering Admission Scholarship for excellent entrance grades, demonstrating strong academic potential.',
        'Core Technical Strengths: Excelled in Python, Data Science, AI, Software Engineering, Mobile Computing, Big Data Systems, and Cyber Security with consistently high grades (primarily A and A-).',
        'Interdisciplinary Focus: Broadened skills through courses in Integrated Marketing Communications (B+) and Creative and New Media (B+), showcasing versatile understanding.',
        'Cumulative GPA of 3.016/4.000 and a Major GPA of 3.144/4.000'
      ]
    },
    {
      degree: 'Higher Diploma in Software Engineering',
      institution: 'Hong Kong Institute of Vocational Education (Lee Wai Lee)',
      location: 'Hong Kong',
      period: 'Sep 2016 - Jun 2018',
      descriptions: [
        'Graduated with Distinction (Award GPA: 3.64)',
        'Core Competencies: Developed strong foundations in Network Fundamentals, Operating Systems, Programming, Database Principles, and Web Technologies.',
        'Software Development Expertise: Gained proficiency in Data Structures & Algorithms, Object-Oriented Technology, Mobile Systems Programming, and System Development.'
      ]
    }
  ];

  projects: Project[] = [
    {
      title: 'Flutter macOS menubar example',
      link: 'https://github.com/mynameiskenlee/flutter_macos_menubar_example',
      technologies: 'Dart, Swift',
      period: 'Mar 2022',
      descriptions: [
        'Achieved 100+ stars on GitHub, demonstrating significant community interest and adoption for a pioneering Flutter template.',
        'Engineered a solution that provides unofficial support for building macOS menubar applications using Google\'s Flutter and Apple\'s AppKit.',
        'Successfully modified core Swift Flutter entry code and integrated a status bar controller, enabling Flutter applications to function seamlessly within the macOS menubar.',
        'Pioneered a new development pathway for macOS utility applications with Flutter, enhancing cross-platform extensibility for future applications.'
      ]
    },
    {
      title: 'Predicting Daily Confirmed Cases in Hong Kong',
      link: 'https://github.com/mynameiskenlee/predicting-covid-19-confirmed-cases',
      technologies: 'Python',
      period: 'Apr 2020 - May 2020',
      descriptions: [
        'A Python-based academic project focused on developing predictive models for daily COVID-19 confirmed cases in Hong Kong.',
        'Objective: To analyze and understand disease progression by forecasting daily confirmed cases using historical data.',
        'Methodology: Employed a comparative modeling approach, integrating both classical regression techniques (OLS, Ridge, Lasso) and time series analysis (ARIMA) to identify optimal predictive strategies.'
      ]
    },
    {
      title: 'Photo Diary',
      link: 'https://github.com/mynameiskenlee/CSCI3310_Photo_Diary',
      technologies: 'Kotlin',
      period: 'Apr 2020 - May 2020',
      descriptions: [
        'CSCI3310 Course Project: An Android application which can record daily life through photos and captions.',
        'User can view past photos with location data in a dynamically populated recycler view.',
        'Utilizes an interactive map activity to precisely locate where photos where taken.'
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleItem(item: any): void {
    item.expanded = !item.expanded;
  }

}
