import 'package:flutter/material.dart';
import 'package:qlevar_router/qlevar_router.dart';
import 'package:url_strategy/url_strategy.dart';

void main() {
  setPathUrlStrategy();
  runApp(KenLee());
}

class DeferredLoader extends QMiddleware {
  // final Future<dynamic> Function() loader;

  DeferredLoader();

  @override
  Future onEnter() async {
    // await loader();
    return super.onEnter();
  }
}

class AppRoutes {
  static String homePage = 'Home Page';
  static String userPage = 'About Page';
  static String photoPage = 'Photos Page';
  static String linkPage = 'Link Page';
  final routes = [
    QRoute(
      path: '/',
      name: 'Home',
      builder: () => Center(
        child: Text(
          'Coming soon...',
          // style: TextStyle(color: Colors.white),
        ),
      ),
      middleware: [
        DeferredLoader(),
      ],
    ),
    QRoute(
      path: 'about',
      name: 'About',
      builder: () => Center(
        child: Text(
          'About',
          // style: TextStyle(color: Colors.white),
        ),
      ),
      middleware: [
        DeferredLoader(),
      ],
    ),
    QRoute(
      path: 'photos',
      name: 'Photos',
      builder: () => Center(
        child: Text(
          'Photos',
          // style: TextStyle(color: Colors.white),
        ),
      ),
      middleware: [
        DeferredLoader(),
      ],
    ),
    QRoute(
      path: 'links',
      name: 'Links',
      builder: () => Center(
        child: Text(
          'Links',
          // style: TextStyle(color: Colors.white),
        ),
      ),
      middleware: [
        DeferredLoader(),
      ],
    ),
  ];
}

class KenLee extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ken Lee',
      theme: ThemeData(
        pageTransitionsTheme: PageTransitionsTheme(builders: {
          TargetPlatform.iOS: FadeUpwardsPageTransitionsBuilder(),
          TargetPlatform.android: FadeUpwardsPageTransitionsBuilder(),
        }),
        useMaterial3: true,
        primaryColor: Color.fromRGBO(128, 184, 239, 1),
        // primaryColorBrightness: Brightness.dark,
        brightness: Brightness.light,
        // primaryColorDark: Colors.black,
        primaryColorLight: Color.fromRGBO(128, 184, 239, 1),
        canvasColor: Colors.white,
        backgroundColor: Color.fromRGBO(128, 184, 239, 1),
        // next line is important!
        appBarTheme: AppBarTheme(
          backgroundColor: Color.fromRGBO(128, 184, 239, 1),
          // brightness: Brightness.dark,
          titleTextStyle: TextStyle(
            color: Colors.white,
          ),
        ),
        navigationBarTheme: NavigationBarThemeData(
          // backgroundColor: Colors.blue,
          iconTheme: MaterialStateProperty.all(
            IconThemeData(
              color: Colors.white,
            ),
          ),
          labelTextStyle: MaterialStateProperty.all(
            TextStyle(
              color: Colors.white,
            ),
          ),
        ),
      ),
      darkTheme: ThemeData(
        pageTransitionsTheme: PageTransitionsTheme(builders: {
          TargetPlatform.iOS: FadeUpwardsPageTransitionsBuilder(),
          TargetPlatform.android: FadeUpwardsPageTransitionsBuilder(),
        }),
        useMaterial3: true,
        colorSchemeSeed: Color.fromRGBO(128, 184, 239, 1),
        // canvasColor: Colors.black,
        brightness: Brightness.dark,
      ),
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  HomePage({Key? key}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".
  // final QRouter route;
  // final String title;

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>
    with SingleTickerProviderStateMixin {
  int index = 0;

  void changePage(int i) {
    switch (i) {
      case 0:
        setState(() {
          this.index = 0;
          QR.navigator.push('/');
        });
        break;
      case 1:
        setState(() {
          this.index = 1;
          QR.navigator.push('/about');
        });
        break;
      case 2:
        setState(() {
          this.index = 2;
          QR.navigator.push('/photos');
        });
        break;
      case 3:
        setState(() {
          this.index = 3;
          QR.navigator.push('/links');
        });
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> bottomNav = [
      NavigationDestination(
        icon: Icon(Icons.home_outlined),
        selectedIcon: Icon(Icons.home_rounded),
        label: "Home",
      ),
      NavigationDestination(
        icon: Icon(Icons.person_pin_outlined),
        selectedIcon: Icon(Icons.person_pin_rounded),
        label: "About",
      ),
      NavigationDestination(
        icon: Icon(Icons.camera_alt_outlined),
        selectedIcon: Icon(Icons.camera_alt_rounded),
        label: "Photos",
      ),
      NavigationDestination(
        icon: Icon(Icons.link_outlined),
        selectedIcon: Icon(Icons.link_rounded),
        label: "Links",
      ),
    ];

    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return LayoutBuilder(
        builder: (BuildContext ctx, BoxConstraints constraints) {
      return Scaffold(
        appBar: AppBar(
          elevation: 0,
          // Here we take the value from the MyHomePage object that was created by
          // the App.build method, and use it to set our appbar title.
          // title: Text(widget.title),
          actions: [],
          bottom: (constraints.maxWidth >= 480)
              ? PreferredSize(
                  preferredSize: Size.fromHeight(kToolbarHeight),
                  child: Align(
                    alignment: Alignment.center,
                    child: ConstrainedBox(
                      constraints: BoxConstraints(maxWidth: 768),
                      child: NavigationBar(
                        labelBehavior:
                            NavigationDestinationLabelBehavior.onlyShowSelected,
                        backgroundColor: Theme.of(context).backgroundColor,
                        selectedIndex: index,
                        destinations: bottomNav,
                        onDestinationSelected: changePage,
                      ),
                    ),
                  ))
              : null,
        ),
        body: SingleChildScrollView(
          child: Container(
            height: MediaQuery.of(context).size.height -
                kBottomNavigationBarHeight -
                kToolbarHeight,
            decoration: BoxDecoration(color: Theme.of(context).backgroundColor),
            child: Scrollbar(
              child: Padding(
                padding: EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: (constraints.maxWidth >= 480) ? 16 : 0),
                child: Center(
                  child: ConstrainedBox(
                    constraints: BoxConstraints(
                      minHeight: MediaQuery.of(context).size.height -
                          ((constraints.maxWidth >= 480)
                              ? kToolbarHeight + 18
                              : kBottomNavigationBarHeight) -
                          kToolbarHeight,
                      maxWidth: 984,
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(0.0),
                      child: Container(
                        width: double.infinity,
                        child: Card(
                          elevation: 0,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              Expanded(
                                child: Router(
                                  routeInformationParser:
                                      QRouteInformationParser(),
                                  routerDelegate: QRouterDelegate(
                                      AppRoutes().routes,
                                      initPath: '/',
                                      withWebBar: true),
                                ),
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
        bottomNavigationBar: (constraints.maxWidth >= 480)
            ? null
            : NavigationBar(
                labelBehavior:
                    NavigationDestinationLabelBehavior.onlyShowSelected,
                backgroundColor: Theme.of(context).backgroundColor,
                selectedIndex: index,
                onDestinationSelected: changePage,
                destinations: bottomNav,
              ),
      );
    });
  }
}
