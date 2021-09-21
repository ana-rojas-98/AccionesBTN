#from _typeshed import Self
import json
import websocket, json
import pymysql
import multiprocessing
from binance import Client
from decimal import Decimal as D, ROUND_DOWN, ROUND_UP
import math


options = {}
options['origin'] = 'https://exchange.blockchain.com'
url = "wss://ws.prod.blockchain.info/mercury-gateway/v1/ws"
#ws = create_connection(url, **options)
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

class MySocket(object):


    def on_message(self, ws, message):
        jsonMensaje=json.loads(message)
        print(message)
        print(jsonMensaje["p"])
        cursor = db.cursor()
        #val=1
        sql1 = "SELECT * FROM acciones_api WHERE active = 1 and id=%s".format(0)
        cursor.execute(sql1, self.tarea)
        results = cursor.fetchall()
        valor=results[0][6]
        ValorporArriba=results[0][9]
        ValorporAbajo=results[0][8]
        porcentaje= results[0][7]/100
        print("Valor ",valor)
        print("ValorArriba ",ValorporArriba)
        print("ValorAbajo ",ValorporAbajo)
        print("Porcentaje ",porcentaje)
        limiteInferior1= ValorporArriba-ValorporArriba*porcentaje
        limiteSuperior1= ValorporArriba+ValorporArriba*porcentaje
        limiteInferior2= ValorporAbajo-ValorporAbajo*porcentaje
        limiteSuperior2= ValorporAbajo+ValorporAbajo*porcentaje
        if(limiteInferior1<=float(jsonMensaje["p"])<=limiteSuperior1):
            #idn=1
            valor=ValorporArriba
            sql1 = "UPDATE acciones_api SET valueBTC = %s WHERE id = %s;".format(0)
            val = (ValorporArriba, self.tarea)
            cursor.execute(sql1, val)
            results = cursor.fetchall()
            db.commit()
            sql1 = "INSERT INTO acciones_historialordenes (`tipo`, `resultado`,  `Api_id`) VALUES (%s,%s,%s)".format(0)
            order1="se actualizo tope al registro mayor"
            val = ("Actualización", order1, self.tarea)
            cursor.execute(sql1, val)
            results = cursor.fetchall()
            db.commit()
            print("se actualizo registro mayor")
        if(limiteInferior2<=float(jsonMensaje["p"])<=limiteSuperior2):
            #idn=1
            valor=ValorporAbajo
            sql1 = "UPDATE acciones_api SET valueBTC = %s WHERE id = %s;".format(0)
            val = (ValorporAbajo, self.tarea)
            cursor.execute(sql1, val)
            results = cursor.fetchall()
            db.commit()
            sql1 = "INSERT INTO acciones_historialordenes (`tipo`, `resultado`, `created_at`, `Api_id`) VALUES (%s,%s,now(),%s)".format(0)
            order1="se actualizo tope al registro menor"
            val = ("Actualización", order1, self.tarea)
            cursor.execute(sql1, val)
            results = cursor.fetchall()
            db.commit()
            print("se actualizo registro menor")

        valorcomision= float(self.USDT_balance['free'])*0.001
        valorComprar = (valor-valorcomision)
        print("Comision ", valorcomision)
        print("Valor para comprar ", valorComprar)
        if(float(jsonMensaje["p"])>=valorComprar):
            if(float(self.USDT_balance['free'])>0.1):
                self.BTC_balance = self.clientUser.get_asset_balance(asset='BTC')
                self.USDT_balance = self.clientUser.get_asset_balance(asset='USDT')
                print(self.USDT_balance['free'])
                if(float(self.USDT_balance['free'])>0.1):
                    USDT=float(self.USDT_balance['free'])
                    VALORACTUAL=float(jsonMensaje["p"])
                    cantidadBTC = USDT/VALORACTUAL
                    cantidadComprarBTC = math.floor(cantidadBTC* 100000)/100000
                    print("Comprar")
                    print("Cantidad a comprar sin redondear", cantidadBTC)
                    print("Cantidad a comprar con redondear", cantidadComprarBTC)
                    quant = D.from_float(cantidadComprarBTC).quantize(D(str(self.minimum)))
                    print("cantidad BTC ", quant)
                    if(USDT>10.3):
                        #order1=self.clientUser.create_order(symbol='BTCUSDT',side=Client.SIDE_BUY,type=Client.ORDER_TYPE_MARKET,quantity=quant)
                        #print(order1)
                        print("Comprar hay USD")
                        self.BTC_balance = self.clientUser.get_asset_balance(asset='BTC')
                        self.USDT_balance = self.clientUser.get_asset_balance(asset='USDT')
                        print("Nueva cantidad BTC" , self.BTC_balance['free'])
                        print("Nueva cantidad USDT" , self.USDT_balance['free'])
                        sql1 = "INSERT INTO acciones_historialordenes (`tipo`, `resultado`, `created_at`, `Api_id`) VALUES (%s,%s,now(),%s)".format(0)
                        order1="prueba"
                        val = ("Compra", order1, self.tarea)
                        cursor.execute(sql1, val)
                        results = cursor.fetchall()
                        db.commit()
                    else:
                        print("Comprar hay USD Orden muy pequeña")
            else:
                print("Comprar no hay USD")

        else:
            valorcomision =float(self.USDT_balance['free'])*0.001
            valorVender = (valor+valorcomision)
            print("Comision ", valorcomision)
            print("Valor para vender ", valorVender)
            if(float(jsonMensaje["p"])<valorVender):
                if(float(self.BTC_balance['free'])>self.minimum):
                    self.BTC_balance = self.clientUser.get_asset_balance(asset='BTC')
                    self.USDT_balance = self.clientUser.get_asset_balance(asset='USDT')
                    if(float(self.BTC_balance['free'])>self.minimum):
                        BTC = float(self.BTC_balance['free'])
                        print("saldo", BTC)
                        print("vender")
                        cantidadVenderBTC = math.floor(BTC* 100000)/100000
                        print("valor redondeado", cantidadVenderBTC )
                        quant = D.from_float(cantidadVenderBTC).quantize(D(str(self.minimum)))
                        print("cantidad BTC ",quant)
                        if(quant>self.minimum):
                            #order1=self.clientUser.create_order(symbol='BTCUSDT',side=Client.SIDE_SELL,type=Client.ORDER_TYPE_MARKET,quantity=quant)
                            #print(order1)
                            print("Vender hay BTC")
                            self.BTC_balance = self.clientUser.get_asset_balance(asset='BTC')
                            self.USDT_balance = self.clientUser.get_asset_balance(asset='USDT')
                            print("Nueva cantidad BTC" , self.BTC_balance['free'])
                            print("Nueva cantidad USDT" , self.USDT_balance['free'])
                            sql1 = "INSERT INTO acciones_historialordenes (`tipo`, `resultado`, `created_at`, `Api_id`) VALUES (%s,%s,now(),%s)".format(0)
                            order1="prueba"
                            val = ("Venta", order1, self.tarea)
                            cursor.execute(sql1, val)
                            results = cursor.fetchall()
                            db.commit()
                        else:
                            print("Vender hay BTC Orden muy pequeña")
                else:
                    print("Vender no hay BTC")

        
                
                
    
    def on_error(self,ws, error):
        print(error)
        
        
    def on_close(self, ws, close_status_code, close_msg):
        print("closed")
 
 
    def nusuario(self, api,secretKey,valor,tarea,lock):
        self.secretKey= secretKey
        self.api = api
        #self.valor= valor
        self.tarea = tarea
        cc="btcusdt"
        socket = f"wss://stream.binance.com:9443/ws/{cc}@trade"
        self.clientUser = Client(api, secretKey)
        print(tarea)
        #valor=valor
        self.BTC_balance = self.clientUser.get_asset_balance(asset='BTC')
        self.USDT_balance = self.clientUser.get_asset_balance(asset='USDT')
        print(self.BTC_balance)
        print(self.USDT_balance)
        info = self.clientUser.get_symbol_info(symbol='BTCUSDT')
        self.minimum = float(info['filters'][2]['minQty']) # 'minQty'
        print(self.minimum)
        ws = websocket.WebSocketApp(socket, on_message=self.on_message,on_close=self.on_close, on_error=self.on_error)
        ws.run_forever()

        

def ejecutar_transacciones():
    global results
    processes = []
    mysocket = MySocket()
    for row in results:
        tarea = str(row[0])
        lock = multiprocessing.Lock()
        process = multiprocessing.Process(target=mysocket.nusuario, args=(row[1],row[5],row[6],tarea,lock))
        processes.append(process)
        process.start()

        
    for proc in processes:
        proc.join()

   

    #print('Saldo final: %i' % saldo.value)

if __name__ == "__main__":
    ejecutar_transacciones()