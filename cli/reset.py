import pandas
import mysql.connector

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
        data = pandas.read_csv("vehicles.csv", engine="python")
        for row in data.itertuples(index=False):
            vehicleID = getattr(row, "vehicleID")
            tagID = getattr(row, "tagID")
            tagProvider = getattr(row, "tagProvider")
            providerAbbr = getattr(row, "providerAbbr")
            licenseYear = getattr(row, "licenseYear")

    except mysql.connector.Error as err:
        print(err)
        ret = -1
    connection.commit()
    cursor.close()
    connection.close()
    return ret