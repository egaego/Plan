### :point_right: This starter repo has moved to the [ionic-team/starters](https://github.com/ionic-team/starters/tree/master/ionic-angular/official/blank) repo! :point_left:

# INSTALATION

Add platform ios
```
ionic cordova platform add ios
```

Add platform android
```
ionic cordova platform add android
```

Set Path ANDROID_HOME in your Mac
```
export ANDROID_HOME=<YOUR PATH ANDROID STUDIO, Lets see in Preferences -> Android SDK>
export PATH=$ANDROID_HOME/platform-tools:$PATH
export PATH=$ANDROID_HOME/tools:$PATH
```

Make sure Java Version is jdk 1.8.0, for check code below:
```
java -version
```

Check java version list
```
/usr/libexec/java_home -V
```


Running android platform
```
ionic cordova emulate android -lcs
```