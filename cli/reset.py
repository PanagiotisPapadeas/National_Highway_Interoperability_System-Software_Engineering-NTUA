import pandas
import mysql.connector

def resetpasses():
    try:
        connection =  mysql.connector.connect(
            host="localhost",
            user="root",
            password="challenge",
            database="softeng2131"
        )
    except mysql.connector.Error as e:
        print(e)
    cursor = connection.cursor()

    try:
        cursor.execute("DELETE FROM passes")
        add_pass = ("INSERT INTO passes "
                    "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)")

        data = pandas.read_csv("passes.csv", engine="python")

        for row in data.itertuples(index=False):
            pass_entity = (getattr(row, "passID"), getattr(row, "stationID"),
                getattr(row, "tagID"), getattr(row, "amount"), getattr(row, "timestamp"),
                getattr(row, "vehicleID"), getattr(row, "operatorID1"), getattr(row, "operatorID2"),
                getattr(row, "stationID"))
            cursor.execute(add_pass, pass_entity)
        ret = 0
    except mysql.connector.Error as err:
        print(err)
        ret = -1
    connection.commit()
    cursor.close()
    connection.close()
    return ret


def resetstations():
    try:
        connection =  mysql.connector.connect(
            host="localhost",
            user="root",
            password="challenge",
            database="softeng2131"
        )
    except mysql.connector.Error as e:
        print(e)
    cursor = connection.cursor()

    try:
        cursor.execute("DELETE FROM stations")
        cursor.execute("DELETE FROM providers_stations")
        add_station = ("INSERT INTO stations "
                    "VALUES (%s, %s)")
        add_providers_stations = ("INSERT INTO providers_stations "
                    "VALUES (%s, %s)")

        data = pandas.read_csv("stations.csv", engine="python")

        for row in data.itertuples(index=False):
            stationID = getattr(row, "stationID")
            stationProvider = getattr(row, "stationProvider")
            stationName = getattr(row, "stationName")
            station_entity = (stationID, stationName)
            cursor.execute(add_station, station_entity)
            providers_stations_entity = (stationProvider, stationID)
            cursor.execute(add_providers_stations, providers_stations_entity)
        ret = 0
    except mysql.connector.Error as err:
        print(err)
        ret = -1
    connection.commit()
    cursor.close()
    connection.close()
    return ret

def resetvehicles():
    try:
        connection =  mysql.connector.connect(
            host="localhost",
            user="root",
            password="challenge",
            database="softeng2131"
        )
    except mysql.connector.Error as e:
        print(e)
    cursor = connection.cursor()

    try:
        cursor.execute("DELETE FROM vehicles")
        cursor.execute("DELETE from tags")
        add_vehicle = ("INSERT INTO vehicles "
                    "VALUES (%s, %s)")

        data = pandas.read_csv("vehicles.csv", engine="python")
        for row in data.itertuples(index=False):
            vehicle_entity = (getattr(row, "vehicleID"), getattr(row, "license_year"))
            cursor.execute(add_vehicle, vehicle_entity)
        ret = 0
    except mysql.connector.Error as err:
        print(err)
        ret = -1
    connection.commit()
    cursor.close()
    connection.close()
    return ret