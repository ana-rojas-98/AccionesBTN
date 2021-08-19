import numpy as np
import json
from websocket import create_connection
import asyncio
import pymysql
import multiprocessing
import ctypes 

options = {}
options['origin'] = 'https://exchange.blockchain.com'
url = "wss://ws.prod.blockchain.info/mercury-gateway/v1/ws"
ws = create_connection(url, **options)
rango = 43350
balancesUSD  = 0.0
balancesBTN = 0.0
db = pymysql.connect(host='localhost',
        user='root',
        password='',
        db='acciones',
        charset='utf8mb4')

cursor = db.cursor()
sql = "SELECT * FROM acciones_api \
WHERE active = 1".format(0)
cursor.execute(sql)

results = cursor.fetchall()
#print(results[1][1])

def inscribircuentas(tokenCuen):
    tokenn = tokenCuen
    msg = '{"token":"' + tokenn + '", "action": "subscribe", "channel": "auth"}'
    l2 = '{"token":" ' + tokenn + '", "action": "subscribe", "channel": "l2", "symbol": "BTC-USD","granularity": 60}'
    prices = '{"token": "' + tokenn + '" , "action": "subscribe", "channel": "prices", "symbol": "BTC-USD","granularity": 60}'
    tradesubscribecr='{"token": "' + tokenn + '", "action": "subscribe", "channel": "trading", "symbol": "BTC-USD", "marginEligible":false, "signedMarginUserAgreement":false}'
    orderjdz='{"action": "NewOrderSingle", "channel": "trading","clOrdID": "Client ID 3","symbol": "BTC-USD","ordType": "market","timeInForce": "GTC","side": "buy","orderQty": 2}'
    cuentastatus='{"action": "subscribe","channel": "balances"}'
    ws.send(msg)
    result =  ws.recv()
    print(result)
    ws.send(tradesubscribecr)
    result3 =  ws.recv()
    print(result3)
    ws.send(cuentastatus)
    result1 =  ws.recv()
    print(result1  + 'h5')
    ws.send(l2)
    result5 =  ws.recv()
    print(result5 + 'h5')

def recibirDatos(tokenCuen, tarea):
    try:
        print(tokenCuen)
        global balancesUSD
        global balancesBTN
        print(str(balancesUSD) + tarea)
        print(str(balancesBTN) + tarea)
        data = ws.recv()
        print(tarea + data)
        arregloprecio=json.loads(data)
        if 'balances' in arregloprecio:
            if len(arregloprecio['balances'])>0:
                balancesUSD =  arregloprecio["balances"][0]["balance"]
                balancesBTN =  arregloprecio["balances"][1]["balance"]
                print(str(balancesUSD) + 'balancesUSDtarea1')
                print(str(balancesBTN) + 'balancesBTNtarea1')
        if 'asks' in arregloprecio:
            arrprecio = arregloprecio['asks']
            if len(arrprecio) > 0:
                precio = arregloprecio['asks'][0]
                print (precio['px'] )
                if precio['px']>rango:
                    if(balancesUSD>0):
                        print ("comprar hay USD " + tokenCuen)
                    if(balancesUSD<=0):
                        print ("comprar no hay USD " + tokenCuen)
                if precio['px']<=rango:
                    if(balancesBTN>0):
                        print ("vender hay BTN " + tokenCuen)
                    if(balancesBTN<=0):
                        print ("vender no hay BTN " + tokenCuen)
            else:
                print (tarea + 'llego vacio')
        else:
            print (tarea + 'No se encontro')

    except ws.close():
        print(f"Terminated")
        #break

    print("    ")
    


def retirar(saldo,lock):
    lock.acquire()
    print('retirar')
    token = results[0][1] 
    inscribircuentas(token)
    lock.release()
    while True:
        toke= "TAREA1" + token
        recibirDatos(toke, "tarea1")
    
        

def depositar(saldo,lock):
    lock.acquire()
    print('depositar')
    token = results[1][1] 
    inscribircuentas(token)
    lock.release()
    while True:
        toke= "TAREA2" + token
        recibirDatos(toke, "tarea2")
        


def nusuario(saldo,tarea,lock):
    lock.acquire()
    print('depositar')
    print(saldo)
    token = saldo
    inscribircuentas(token)
    lock.release()
    while True:
        toke= tarea + token
        recibirDatos(toke, tarea)

        

def ejecutar_transacciones():
    
    global results
    processes = []

    for row in results:
        tarea = "TAREA" + str(row[0])
        lock = multiprocessing.Lock()
        process = multiprocessing.Process(target=nusuario, args=(row[1],tarea ,lock))
        processes.append(process)
        process.start()

        
    for proc in processes:
        proc.join()

   

    #print('Saldo final: %i' % saldo.value)

if __name__ == "__main__":
    ejecutar_transacciones()