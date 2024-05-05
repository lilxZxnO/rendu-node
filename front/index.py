import network
import urequests
import utime
import ujson  # Ajout du module json pour gérer les données JSON
from machine import Pin, PWM

wlan = network.WLAN(network.STA_IF)
wlan.active(True) 

ssid = 'iPhone de Cheikh'
password = 'Cheikh75'
wlan.connect(ssid, password)

url = "http://172.20.10.2:3000/house"

maison = {
    "Gryffindor": [255, 0, 0],
    "Slytherin": [0, 255, 0],
    "Hufflepuff": [200, 200, 0],
    "Ravenclaw": [0, 0, 255]
}

led = [PWM(Pin(18, mode=Pin.OUT)), PWM(Pin(17, mode=Pin.OUT)), PWM(Pin(16, mode=Pin.OUT))]

for i in led:
    i.freq(1000)
    
def setColor(c):
    for i in range(3):
        led[i].duty_u16(c[i] * 256)

while not wlan.isconnected():
    print("Pas co")
    utime.sleep(1)

while True:
    try:
        print("GET")
        r = urequests.get(url)
        house_data = r.json()["data"]
        r.close()
        print(house_data)
        setColor(maison[house_data])
        utime.sleep(1)
        
    except Exception as e:
        print(e)

