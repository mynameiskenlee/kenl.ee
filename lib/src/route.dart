import 'package:angular_router/angular_router.dart';
import 'package:kenl.ee/src/todo_list/todo_list_component.template.dart';
import 'package:kenl.ee/src/pages/about/about.template.dart';

class RoutePaths {
  static final home = RoutePath(path: '');
  static final about = RoutePath(path: 'about');
}

RouteDefinition redirectTo(String path, String redirect) =>
    RouteDefinition.redirect(path: path, redirectTo: redirect);

class Routes {
  static final home = RouteDefinition(
    routePath: RoutePaths.home,
    component: TodoListComponentNgFactory,
    useAsDefault: true,
  );
  static final about = RouteDefinition(
    routePath: RoutePaths.about,
    component: AboutComponentNgFactory,
  );
  static final all = <RouteDefinition>[
    home,
    about,
    RouteDefinition.redirect(
      path: '',
      redirectTo: RoutePaths.home.toUrl(),
    ),
  ];
}
