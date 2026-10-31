# Relógio e saída serial - ESP-IDF

Exemplo didático sem leitura de sensores. Requer ESP-IDF instalado segundo o guia oficial. Conferir placa, target e porta. No diretório firmware:

```text
idf.py set-target esp32
idf.py build
idf.py -p PORTA_DA_SUA_PLACA flash monitor
```

Este pacote valida os exercícios Python. A compilação e o ensaio deste exemplo no ESP-IDF e na placa escolhida fazem parte da atividade do aluno. Não representa firmware de aquisição de 250 Hz nem driver ADXL355. Os valores publicados são sintéticos.
