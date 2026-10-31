// Exercício ESP-IDF de relógio e serial. Não lê o ADXL355.
#include <stdio.h>
#include <inttypes.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_timer.h"
void app_main(void) {
    unsigned seq=0;
    while (1) {
        printf("{\"origem\":\"synthetic\",\"seq\":%u,\"t_us\":%" PRId64 ",\"valor_demo\":%u}\n",seq,esp_timer_get_time(),seq%10);
        seq++;
        vTaskDelay(pdMS_TO_TICKS(100));
    }
}
