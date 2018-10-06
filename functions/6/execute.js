var key;
var value;
var label = properties.label;
var deviceId = properties.deviceId;
var secretKey = properties.secretKey;
var url = "https://api.soracom.io/v1/devices/"+deviceId+"/publish"
log(JSON.stringify(messageValues));

if(messageValues.functionId.match(/AccelerationShake/)) {
	key = "Move.Shake";
	value = messageValues.intensity;
}
else if(messageValues.functionId.match(/AccelerationTap/)) {
	key = "Move.Tap";
	value = messageValues.intensity;
}
else if(messageValues.functionId.match(/AccelerationOrientation/)) {
	key = "Move.Orientation";
	value = messageValues.orientation;
}
else if(messageValues.functionId.match(/AccelerationFlip/)) {
	key = "Move.Flip";
	value = 1;
}
else if(messageValues.functionId.match(/ButtonPressed/)) {
	key = "Button.Pressed";
	value = 1;
}
else if(messageValues.functionId.match(/ButtonLongPressed/)) {
	key = "Button.Hold";
	value = 1;
}
else if(messageValues.functionId.match(/ButtonDoublePressed/)) {
	key = "Button.Double";
	value = 1;
}
else if(messageValues.functionId.match(/GPIODigitalIn/)) {
	key = "GPIO.DIN"+messageValues.pin;
	if(messageValues.trigger.match(/1/)){
		key = key + ".High";
	}else if(messageValues.trigger.match(/2/)){
		key = key + ".Low";
	}
	value = 1;
}
else if(messageValues.functionId.match(/GPIOAnalogIn/)) {
	key = "GPIO.AnalogIn";
	value = messageValues.value;
}
else if(messageValues.functionId.match(/MotionDetected/)) {
	key = "Motion.Detected";
	value = 1;
}
else if(messageValues.functionId.match(/MotionUndetected/)) {
	key = "Motion.Undetected";
	value = 1;
}
else if(messageValues.functionId.match(/MotionStateNotified/)) {
	if(messageValues.stateValue==1){
		key = "Motion.Detected";
	}else{
		key = "Motion.Undetected";
	}
	value = 1;
}
else if(messageValues.functionId.match(/TempTempChanged/)) {
	key = "Temperature";
	value = messageValues.temperatureValue;
}
else if(messageValues.functionId.match(/TempCheckTemp/)) {
	key = "Temperature";
	value = messageValues.temperatureValue;
}
else if(messageValues.functionId.match(/TempHumidChanged/)) {
	key = "Humidity";
	value = messageValues.humidityValue;
}
else if(messageValues.functionId.match(/TempCheckHumid/)) {
	key = "Humidity";
	value = messageValues.humidityValue;
}
else if(messageValues.functionId.match(/BrightnessBrightnessChanged/)) {
	key = "Brightness";
	value = messageValues.brightnessRaw;
}
else if(messageValues.functionId.match(/BrightnessCheckBrightness/)) {
	key = "Brightness";
	value = messageValues.brightnessRaw;
}
else if(messageValues.functionId.match(/BrightnessGetNear/)) {
	key = "Brightness.Closeness";
	value = 1;
}
else if(messageValues.functionId.match(/BrightnessGetNotNear/)) {
	key = "Brightness.Openness";
	value = 1;
}
else if(messageValues.functionId.match(/BrightnessCheckNear/)) {
	key = "Brightness.Closenes";
	value = 1;
}
else if(messageValues.functionId.match(/BrightnessCheckNotNear/)) {
	key = "Brightness.Openess";
	value = 1;
}
else if(messageValues.functionId.match(/MicrophoneDetectSound/)) {
	key = "Mic";
	value = messageValues.averagePower;
}
else if(messageValues.functionId.match(/MicrophoneCheckSound/)) {
	key = "Mic";
	value = messageValues.averagePower;
}
else {
	value = 1;
}

var data = {[key+label]:value};
log(JSON.stringify(data));
ajax( {
	url : url,
	data: JSON.stringify(data),
	type : "POST",
	contentType : "application/json",
	timeout : 5000,
	headers: {
		"x-device-secret": secretKey
	}
}) .done ( function ( response ) {
	log("success");
	log(JSON.stringify(response));
}) .fail ((error) =>{
	log("error");
	log(JSON.stringify(error));
});

return {
	resultType : "pause"
};
