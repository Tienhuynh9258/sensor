function TEMP_Buzzer () {
    counter_buzzer = 0
    counter_measure += 1
    if (counter_measure >= 50) {
        counter_measure = 0
        NPNBitKit.DHT11Read(DigitalPin.P0)
        if (NPNBitKit.DHT11Temp() > 32) {
            NPNBitKit.Relay(DigitalPin.P2, true)
            counter_buzzer += 1
            if (counter_buzzer < 5) {
                pins.analogWritePin(AnalogPin.P2, 512)
                basic.pause(500)
                pins.digitalWritePin(DigitalPin.P2, 0)
                basic.pause(500)
            }
        } else {
            NPNBitKit.Relay(DigitalPin.P2, false)
        }
    }
}
let counter_buzzer = 0
let counter_measure = 0
led.enable(false)
counter_measure = 0
basic.forever(function () {
    TEMP_Buzzer()
    basic.pause(100)
})
