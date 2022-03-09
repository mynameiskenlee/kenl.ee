// import 'dart:async';

import 'dart:html';

import 'package:angular/angular.dart';
import 'package:ngcomponents/angular_components.dart';
import 'package:angular_router/angular_router.dart';

@Component(
  selector: 'home',
  styleUrls: ['home.css'],
  templateUrl: 'home.html',
  directives: [
    RouterLink,
  ],
  providers: [materialProviders],
)
class HomeComponent {
  void navigateTo(String url) {
    window.location.assign(url);
  }
}
