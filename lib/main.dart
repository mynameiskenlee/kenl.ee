import 'package:flutter/material.dart';

void main() {
  runApp(KenLee());
}

class KenLee extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ken Lee',
      theme: ThemeData(
          primaryColor: Colors.blue,
          primaryColorBrightness: Brightness.dark,
          brightness: Brightness.light,
          primaryColorDark: Colors.black,
          primaryColorLight: Colors.blue,
          canvasColor: Colors.white,
          backgroundColor: Colors.blue,
          // next line is important!
          appBarTheme: AppBarTheme(
            brightness: Brightness.dark,
            titleTextStyle: TextStyle(
              color: Colors.white,
            ),
          ),
          bottomNavigationBarTheme:
              BottomNavigationBarThemeData(backgroundColor: Colors.blue)),
      darkTheme: ThemeData(
        primaryColor: Colors.grey[700],
        primaryColorBrightness: Brightness.dark,
        primaryColorLight: Colors.black,
        brightness: Brightness.dark,
        primaryColorDark: Colors.black,
        indicatorColor: Colors.white,
        canvasColor: Colors.black,
        // next line is important!
        appBarTheme: AppBarTheme(
          brightness: Brightness.dark,
          titleTextStyle: TextStyle(
            color: Colors.black,
          ),
        ),
      ),
      home: HomePage(title: 'Ken Lee'),
    );
  }
}

class HomePage extends StatefulWidget {
  HomePage({Key? key, required this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int index = 0;

  @override
  Widget build(BuildContext context) {
    List<BottomNavigationBarItem> bottomNav = [
      BottomNavigationBarItem(
        backgroundColor: Theme.of(context).backgroundColor,
        icon: Icon(Icons.home_outlined),
        activeIcon: Icon(Icons.home_rounded),
        label: "Home",
      ),
      BottomNavigationBarItem(
        backgroundColor: Theme.of(context).backgroundColor,
        icon: Icon(Icons.person_pin_outlined),
        activeIcon: Icon(Icons.person_pin_rounded),
        label: "About",
      ),
      BottomNavigationBarItem(
        backgroundColor: Theme.of(context).backgroundColor,
        icon: Icon(Icons.camera_alt_outlined),
        activeIcon: Icon(Icons.camera_alt_rounded),
        label: "Photo",
      ),
      BottomNavigationBarItem(
        backgroundColor: Theme.of(context).backgroundColor,
        icon: Icon(Icons.link_outlined),
        activeIcon: Icon(Icons.link_rounded),
        label: "Links",
      ),
    ];
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height -
              kBottomNavigationBarHeight -
              kToolbarHeight,
          decoration: BoxDecoration(color: Theme.of(context).backgroundColor),
          child: ConstrainedBox(
            constraints: BoxConstraints(
                minHeight: MediaQuery.of(context).size.height -
                    kBottomNavigationBarHeight -
                    kToolbarHeight,
                minWidth: double.infinity),
            child: Center(
              // Center is a layout widget. It takes a single child and positions it
              // in the middle of the parent.
              child: Padding(
                padding: const EdgeInsets.all(0.0),
                child: Container(
                  width: double.infinity,
                  child: Card(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Text(
                          'Coming soon...',
                          // style: TextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
      bottomNavigationBar: LayoutBuilder(
        builder: (BuildContext ctx, BoxConstraints constraints) {
          BottomNavigationBarType type = (constraints.maxWidth >= 480)
              ? BottomNavigationBarType.fixed
              : BottomNavigationBarType.shifting;
          return BottomNavigationBar(
            // backgroundColor: Theme.of(context).backgroundColor,
            selectedItemColor: Colors.white,
            unselectedItemColor: Colors.white60,
            currentIndex: index,
            showUnselectedLabels: false,
            onTap: (int) {
              setState(() {
                index = int;
              });
            },
            type: type,
            items: bottomNav,
          );
        },
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
