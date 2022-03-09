// import 'dart:async';

import 'dart:html';

import 'package:angular/angular.dart';
import 'package:ngcomponents/angular_components.dart';
import 'package:angular_router/angular_router.dart';

@Component(
  selector: 'about',
  styleUrls: ['about.css'],
  templateUrl: 'about.html',
  directives: [
    RouterLink,
  ],
  providers: [materialProviders],
)
class AboutComponent with OnInit, OnDestroy {
  void navigateTo(String url) {
    window.location.assign(url);
  }

  @override
  void ngOnInit() {
    document.title = 'About | Ken Lee';
    // print("onInit");
  }

  @override
  void ngOnDestroy() {
    // print("onDestroy");
  }

  // @override
  // Future<void> onActivate(RouterState previous, RouterState current) async {
  //   // TODO: implement onActivate
  //   HtmlElement main = document.querySelector('main');
  //   await Future(
  //     () => main.animate(
  //       [
  //         {'height': '0px'},
  //         {'height': 'auto'},
  //       ],
  //       {
  //         'duration': 1500,
  //         'name': 'fade-in-animation',
  //         'easing': 'ease-in',
  //         'fill': 'forwards',
  //       },
  //     ).play(),
  //   );
  // }

  // @override
  // Future<void> onDeactivate(RouterState current, RouterState next) async {
  //   // TODO: implement onDeactivate
  //   HtmlElement main = document.querySelector('main');
  //   await Future(
  //     () => main.animate(
  //       [
  //         {'height': 'auto'},
  //         {'height': '0px'},
  //       ],
  //       {
  //         'duration': 1500,
  //         'name': 'fade-out-animation',
  //         'easing': 'ease-out',
  //         'fill': 'forwards',
  //       },
  //     ).play(),
  //   );
  // }
}
