from socketIO_client import SocketIO
import serial
import time
import json

# Conectando por serial a Arduino
print("Connecting with Arduino...")
arduino = serial.Serial('COM3', 115200, timeout = 3.0)
arduino.isOpen()
print("Reader succesfully connected with Arduino.")

# Conectando al socket del Servidor
print("Connecting with server...")
socketIO = SocketIO('localhost', 5001)
print("Reader succesfully connected with server.")

while True:
	arduino.write("#".encode())
	val = arduino.readline().strip()
	#print(val)

	if not val:
		continue
	try:
		val_json = json.loads(val)
		print(val_json)
	except json.JSONDecodeError as e:
		print("JSON",e)

	socketIO.emit('from_arduino', val_json)
	time.sleep(1.0)