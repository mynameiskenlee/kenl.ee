// import 'dart:async';

import 'package:angular/angular.dart';

@Component(
  selector: 'footer',
  styleUrls: ['footer.css'],
  templateUrl: 'footer.html',
)
class FooterComponent {
  final int _year = DateTime.now().year;
  int get year => _year;
}
