import argparse
import csv
import importlib
import json
import mysql.connector
import os

import reset

print("Script started!")

connected = True
try:
    connection =  mysql.connector.connect(
        host="localhost",
        user="root",
        password="challenge",
        database="softeng2131"
    )
except mysql.connector.Error as e:
    connected = False
    print(e)
cursor = connection.cursor()

parser = argparse.ArgumentParser(description='CLI program')

parser.add_argument("scope", type=str, help="The action to perform")

args = parser.parse_args()

if args.scope == "healthcheck":
    f = open("healthcheck.json", "w")
    if connected == True:
        json_object = {"status":"OK", "dbconnection":"softeng2131"}
    else:
        json_object = {"status": "failed"}
    json.dump(json_object, f, ensure_ascii=False)
elif args.scope == "resetpasses":
    f = open("resetpasses.json", "w")
    try:
        cursor.execute("DELETE FROM passes")
        connection.commit()
        json_object = {"status": "OK"}
    except mysql.connector.Error as e:
        json_object = {"status": "failed"}
    json.dump(json_object, f, ensure_ascii=False)
elif args.scope == "resetstations":
    f = open("resetstations.json", "w")
    ret = reset.resetstations()
    if ret == 0:
        json_object = {"status": "OK"}
    else:
        json_object = {"status": "failed"}
    json.dump(json_object, f)
elif args.scope == "resetvehicles":
    cursor.execute("DELETE FROM vehicles")
    #TODO add vehicles
    #TODO add json
elif args.scope == "admin":
    parser.add_argument("--passesupd", help="Upload passes from a .csv file", action="store_true")
    parser.add_argument("--source", help="Specifiy the .csv file")
    args = parser.parse_args()
    if not args.passesupd or args.source is None:
        print("Usage: se2131 admin --passesupd --source <csv file>")
    else:
        pass
        #TODO insert from csv

connection.close()