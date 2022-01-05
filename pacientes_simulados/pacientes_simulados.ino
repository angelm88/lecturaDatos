#include <ArduinoJson.h>

int8_t key;
StaticJsonDocument<128> sensorData;
JsonArray SpO2 = sensorData.createNestedArray("spo2");
JsonArray HR = sensorData.createNestedArray("hr");

void setup()
{
  Serial.begin(115200); // initialize serial communication at 115200 bits per second:
  while (!Serial) continue;
}

void loop() // todo este proceso se debe de repetir si se planea tomar una medición de oximetría
{
  while (1)
  {
    sensorData["spo2"][0] = random(96,99);
    sensorData["hr"][0] = random(65,71);
    sensorData["spo2"][1] = random(96,99);
    sensorData["hr"][1] = random(65,71);
    sensorData["spo2"][2] = random(95,99);
    sensorData["hr"][2] = random(65,71);
    
    for(uint8_t index = 3; index < 6; index++)
    {
      sensorData["spo2"][index] = random(78,99);
      sensorData["hr"][index] = random(65,71);
    }
    
    if(Serial.available()>0){
      key = Serial.read();
      if(key == '#'){
        serializeJson(sensorData, Serial);
        Serial.println();
      }  
    }
  }
}
