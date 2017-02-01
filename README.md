# cssams-servable

    npm install -g cordova
    npm install -g ionic
    npm install
    ionic plugin add cordova-plugin-file-transfer
    ionic plugin add uk.co.workingedge.phonegap.plugin.launchnavigator
    ionic serve


## For IOS depolyment, install XCode FIRST

    cordova platform add ios
    sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
    ionic build ios

Then use XCode to open the project in platforms/ios/KWCSSA.xcodeproj


## for push notification

Note: You can test on device only if you have the developer account

	sudo gem install cocoapods
	pod setup // may take some time
	cordova plugin add phonegap-plugin-push --variable SENDER_ID=206726418266 --save

May need to do the following step:
http://stackoverflow.com/questions/31205133/how-to-enable-bitcode-in-xcode-7/32466484#32466484


