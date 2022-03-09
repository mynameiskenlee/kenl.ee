import 'dart:async';
import 'dart:html';

import 'package:angular/angular.dart';
import 'package:ngcomponents/angular_components.dart';
import 'package:angular_router/angular_router.dart';

import 'todo_list_service.dart';

@Component(
  selector: 'todo-list',
  styleUrls: ['todo_list_component.css'],
  templateUrl: 'todo_list_component.html',
  directives: [
    RouterLink,
    MaterialCheckboxComponent,
    MaterialFabComponent,
    MaterialIconComponent,
    materialInputDirectives,
    MaterialTooltipDirective,
    NgFor,
    NgIf,
  ],
  providers: [ClassProvider(TodoListService)],
)
class TodoListComponent with OnInit, OnDestroy {
  final TodoListService todoListService;

  List<String> items = [];
  String newTodo = '';

  TodoListComponent(this.todoListService);

  @override
  Future<void> ngOnInit() async {
    document.title = 'Ken Lee';
    items = await todoListService.getTodoList();
    print("onInit");
  }

  @override
  void ngOnDestroy() {
    print("onDestroy");
  }

  void add() {
    items.add(newTodo);
    newTodo = '';
  }

  String remove(int index) => items.removeAt(index);
}
