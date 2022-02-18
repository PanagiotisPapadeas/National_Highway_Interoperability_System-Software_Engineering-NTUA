import argparse
import csv
import json
import mysql.connector
import os

import queries

def save_as_csv(query, name):
    c = csv.writer(open(name, 'w'))
    result = []
    names = []
    for i in cursor.description:
        names.append(i[0])
    result.append(names)
    for row in query:
        result.append(row)
    c.writerows(result)

print("Script started!")

connected = True
try:
    connection =  mysql.connector.connect(
        host="localhost",
        user="root",
        password="panoplos",
        database="softeng2131"
    )
except mysql.connector.Error as e:
    connected = False
    print(e)
cursor = connection.cursor()

parser = argparse.ArgumentParser(description='CLI program for')
# parser.add_argument("subcommand", type=str, help="The action to perform")
subparsers = parser.add_subparsers(dest="subcommand", help= "Choose the specific subcommand to execute")

parser_pps = subparsers.add_parser("passesperstation", help="Get passes per station")
parser_pps.add_argument("--station", help="Station to get data for")
parser_pps.add_argument("--datefrom", help="Date to start the search")
parser_pps.add_argument("--dateto", help="Date to end the search")

parser_analysis = subparsers.add_parser("passesanalysis", help="Return passes with tags from one operator and stations from another")
parser_analysis.add_argument("--op1", help="Operator that owns the stations")
parser_analysis.add_argument("--op2", help="Operator that owns the tags")
parser_analysis.add_argument("--datefrom", help="Date to start the search")
parser_analysis.add_argument("--dateto", help="Date to end the search")

parser_chargesby = subparsers.add_parser("passescost", help="Get debt from one operator to another")
parser_chargesby.add_argument("--op1", help="Operator that owns the stations")
parser_chargesby.add_argument("--op2", help="Operator that owns the tags")
parser_chargesby.add_argument("--datefrom", help="Date to start the search")
parser_chargesby.add_argument("--dateto", help="Date to end the search")


parser_healthcheck = subparsers.add_parser("healthcheck", help="Return status message from database")

args = parser.parse_args()
#print(str(args))

if args.subcommand == "healthcheck":
    f = open("healthcheck.json", "w")
    if connected == True:
        json_object = {"status":"OK", "dbconnection":"softeng2131"}
    else:
        json_object = {"status": "failed"}
    json.dump(json_object, f, ensure_ascii=False)
elif args.subcommand == "resetpasses":
    f = open("resetpasses.json", "w")
    ret = queries.resetpasses()
    if ret == 0:
        json_object = {"status": "OK"}
    else:
        json_object = {"status": "failed"}
    json.dump(json_object, f, ensure_ascii=False)
elif args.subcommand == "resetstations":
    f = open("resetstations.json", "w")
    ret = queries.resetstations()
    if ret == 0:
        json_object = {"status": "OK"}
    else:
        json_object = {"status": "failed"}
    json.dump(json_object, f)
elif args.subcommand == "resetvehicles":
    f = open("resetvehicles.json", "w")
    ret = queries.resetvehicles()
    if ret == 0:
        json_object = {"status": "OK"}
    else:
        json_object = {"status": "failed"}
    json.dump(json_object, f)
elif args.subcommand == "passesperstation":
    print("yes")
    try:
        cursor.execute("""select passID, timestamp, vehicleID, tag_provider, pass_type, amount
        from passes, tags
        where passes.tagID = tags.tagID and stationID = '""" + args.station + """' and timestamp >= """ 
        + args.datefrom + """ and timestamp <= """ + args.dateto)
        result = cursor.fetchall()
        save_as_csv(result, "passesanalysis.csv")
    except mysql.connector.Error as err:
        print(err)
        ret = -1
elif args.subcommand == "passesanalysis":
    try:
        cursor.execute("""select passID, stationID, timestamp, vehicleID, amount
        from passes
        where pass_type = "visitor" and operatorID1 = '""" + args.op1 + """' and operatorID2 = '""" + 
        args.op2 + """' and timestamp >= """ + args.datefrom + """ and timestamp <= """ + args.dateto)
        result = cursor.fetchall()
        save_as_csv(result, "passesanalysis.csv")
    except mysql.connector.Error as err:
        print(err)
        ret = -1
elif args.subcommand == "admin":
    parser.add_argument("--passesupd", help="Upload passes from a .csv file", action="store_true")
    parser.add_argument("--source", help="Specifiy the .csv file")
    args = parser.parse_args()
    if not args.passesupd or args.source is None:
        print("Usage: se2131 admin --passesupd --source <csv file>")
    else:
        pass
        #TODO insert from csv

connection.close()