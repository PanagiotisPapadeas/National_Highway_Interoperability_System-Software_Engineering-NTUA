import argparse
import csv
import json
import pandas
import mysql.connector

status_code = 0 # used for testing purposes

# Save SQL query as .csv file
def save_as_csv(query, name):
    path = "results/" + name
    c = csv.writer(open(path, 'w'))
    result = []
    names = []
    for i in cursor.description:
        names.append(i[0])
    result.append(names)
    for row in query:
        result.append(row)
    c.writerows(result)

# Save SQL query as .json file
def save_as_json(query, name):
    path = "results/" + name
    save_as_csv(query, ".temp.csv")
    with open("results/.temp.csv") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    with open(path, 'w') as f:
        json.dump(rows, f)

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

# Main parser
parser = argparse.ArgumentParser(description='CLI program for HIS')
subparsers = parser.add_subparsers(dest="subcommand", help= "Choose the specific subcommand to execute")

parser_healthcheck = subparsers.add_parser("healthcheck", help="Confirm successful connection to the database")
parser_resetpasses = subparsers.add_parser("resetpasses", help="Reinitialize to the initial .csv data")
parser_resetstations = subparsers.add_parser("resetstations", help="Reinitialize stations")
parser_resetvehicles = subparsers.add_parser("resetvehicles", help="Reinitialize vehicles")

parser_pps = subparsers.add_parser("passesperstation", help="Get passes per station")
parser_pps.add_argument("--station", required=True, help="Station to get data for")
parser_pps.add_argument("--datefrom", required=True, help="Date to start the search")
parser_pps.add_argument("--dateto", required=True, help="Date to end the search")
parser_pps.add_argument("--format", default="csv", help=".csv or json")

parser_analysis = subparsers.add_parser("passesanalysis", help="""Return passes with tags from one operator and
    stations from another""")
parser_analysis.add_argument("--op1", required=True, help="Operator that owns the stations")
parser_analysis.add_argument("--op2", required=True, help="Operator that owns the tags")
parser_analysis.add_argument("--datefrom", required=True, help="Date to start the search")
parser_analysis.add_argument("--dateto", required=True, help="Date to end the search")
parser_analysis.add_argument("--format", default="csv", help=".csv or json")

parser_passescost = subparsers.add_parser("passescost", help="Get debt from one operator to another")
parser_passescost.add_argument("--op1", required=True, help="Operator that owns the stations")
parser_passescost.add_argument("--op2", required=True, help="Operator that owns the tags")
parser_passescost.add_argument("--datefrom", required=True, help="Date to start the search")
parser_passescost.add_argument("--dateto", required=True, help="Date to end the search")
parser_passescost.add_argument("--format", default="csv", help=".csv or json")

parser_chargesby = subparsers.add_parser("chargesby", help="Get debts to onee operator from all others")
parser_chargesby.add_argument("--op1", required=True, help="Operator that owns the stations")
parser_chargesby.add_argument("--datefrom", required=True, help="Date to start the search")
parser_chargesby.add_argument("--dateto", required=True, help="Date to end the search")
parser_chargesby.add_argument("--format", default="csv", help=".csv or json")

parser_admin = subparsers.add_parser("admin", help="Configure the database as an admin")
parser_admin.add_argument("--passesupd", action="store_true", help="Upload passes from a .csv file")
parser_admin.add_argument("--source", help="Operator that owns the stations")

args = parser.parse_args()

if args.subcommand == "healthcheck":
    f = open("healthcheck.json", "w")
    if connected == True:
        json_object = {"status":"OK", "dbconnection":"softeng2131"}
        status_code = 200
    else:
        json_object = {"status": "failed"}
        status_code = 500
    json.dump(json_object, f, ensure_ascii=False)
elif args.subcommand == "resetpasses":
    f = open("resetpasses.json", "w")
    try:
        cursor.execute("DELETE FROM passes")
        add_pass = ("INSERT INTO passes "
                    "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)")

        data = pandas.read_csv("passes.csv", engine="python")

        for row in data.itertuples(index=False):
            pass_entity = (getattr(row, "passID"), getattr(row, "stationID"),
                getattr(row, "tagID"), getattr(row, "amount"), getattr(row, "timestamp"),
                getattr(row, "vehicleID"), getattr(row, "operatorID1"), getattr(row, "operatorID2"),
                getattr(row, "pass_type"))
            cursor.execute(add_pass, pass_entity)
        connection.commit()
        status_code = 200
    except mysql.connector.Error as err:
        print(err)
        status_code = 500
    if status_code == 200:
        json_object = {"status": "OK"}
    else:
        json_object = {"status": "failed"}
    json.dump(json_object, f, ensure_ascii=False)
elif args.subcommand == "resetstations":
    f = open("resetstations.json", "w")
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
        status_code = 200
    except mysql.connector.Error as err:
        print(err)
        status_code = 500
    connection.commit()
    if status_code == 200:
        json_object = {"status": "OK"}
    else:
        json_object = {"status": "failed"}
    json.dump(json_object, f)
elif args.subcommand == "resetvehicles":
    f = open("resetvehicles.json", "w")
    try:
        cursor.execute("DELETE FROM vehicles")
        cursor.execute("DELETE from tags")
        add_vehicle = ("""INSERT INTO vehicles
                            VALUES (%s, %s)""")
        add_tag = ("""INSERT INTO tags 
                            VALUES (%s, %s, %s, %s)""")

        data1 = pandas.read_csv("vehicles.csv", engine="python")
        for row in data1.itertuples(index=False):
            vehicle_entity = (getattr(row, "vehicleID"), getattr(row, "license_year"))
            cursor.execute(add_vehicle, vehicle_entity)
        data2 = pandas.read_csv("tags.csv", engine="python")
        for row in data2.itertuples(index=False):
            tag_entity = (getattr(row, "tagID"), getattr(row, "balance"), getattr(row, "tag_provider"), 
                getattr(row, "provider_abbr"), )
            cursor.execute(add_tag, tag_entity)
        status_code = 200
    except mysql.connector.Error as err:
        print(err)
        status_code = 500
    connection.commit()
    if status_code == 200:
        json_object = {"status": "OK"}
    else:
        json_object = {"status": "failed"}
    json.dump(json_object, f)
elif args.subcommand == "passesperstation":
    try:
        cursor.execute("""select passID, timestamp, vehicleID, tag_provider, pass_type, amount
        from passes, tags
        where passes.tagID = tags.tagID and stationID = '""" + args.station + """' and timestamp >= """ 
        + args.datefrom + """ and timestamp <= """ + args.dateto +
        " order by timestamp")
        result = cursor.fetchall()
        if len(result) == 0:
            status_code = 402
        else:
            if args.format == "json":
                save_as_json(result, "passesperstation.json")
                status_code = 200
            elif args.format == "csv":
                save_as_csv(result, "passesperstation.csv")
                status_code = 200
            else:
                status_code = 400
    except mysql.connector.Error as err:
        print(err)
        status_code = 500
elif args.subcommand == "passesanalysis":
    try:
        cursor.execute("""select passID, stationID, timestamp, vehicleID, amount
            from passes
            where pass_type = 'visitor' and operatorID1 = '""" + args.op1 + """' and operatorID2 = '""" + 
            args.op2 + """' and timestamp >= """ + args.datefrom + """ and timestamp <= """ + args.dateto +
            " order by timestamp")
        result = cursor.fetchall()
        if len(result) == 0:
            status_code = 402
        else:
            if args.format == "json":
                save_as_json(result, "passesanalysis.json")
                status_code = 200
            elif args.format == "csv":
                save_as_csv(result, "passesanalysis.csv")
                status_code = 200
            else:
                status_code = 400
    except mysql.connector.Error as err:
        print(err)
        status_code = 500
elif args.subcommand == "passescost":
    try:
        cursor.execute("""select count(*) as NumberofPasses, sum(amount) as PassesCost
            from passes
            where operatorID1 = '""" + args.op1 + """' and operatorID2 = '""" + args.op2 +
            """' and timestamp >= """ + args.datefrom + """ and timestamp <= """ + args.dateto)
        result = cursor.fetchall()
        if args.format == "json":
            save_as_json(result, "passescost.json")
            status_code = 200
        elif args.format == "csv":
            save_as_csv(result, "passescost.csv")
            status_code = 200
        else:
            status_code = 400
    except mysql.connector.Error as err:
        print(err)
        status_code = 500
elif args.subcommand == "chargesby":
    try:
        cursor.execute("""select operatorID2, count(*) as NumberOfPasses, sum(amount) as PassesCost
            from passes
            where operatorID1 = '""" + args.op1 + """' and pass_type = 'visitor' and timestamp >= """ +
            args.datefrom + """ and timestamp <= """ + args.dateto + " group by operatorID2")
        result = cursor.fetchall()
        if len(result) == 0:
            status_code = 402
        else:
            if args.format == "json":
                save_as_json(result, "chargesby.json")
                status_code = 200
            elif args.format == "csv":
                save_as_csv(result, "chargesby.csv")
                status_code = 200
            else:
                status_code = 400
    except mysql.connector.Error as err:
        print(err)
        status_code = 500
elif args.subcommand == "admin":
    if args.passesupd:
        if args.source is None: 
            status_code = 400
        else:
            try:
                data = pandas.read_csv(args.source, engine="python")
                add_pass = ("""INSERT INTO passes 
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""")
                try: 
                    for row in data.itertuples(index=False):
                        pass_entity = (getattr(row, "passID"), getattr(row, "stationID"),
                        getattr(row, "tagID"), getattr(row, "amount"), getattr(row, "timestamp"),
                        getattr(row, "vehicleID"), getattr(row, "operatorID1"), getattr(row, "operatorID2"),
                        getattr(row, "stationID"))
                    cursor.execute(add_pass, pass_entity)
                    connection.commit()
                    status_code = 200
                except mysql.connector.Error as err:
                    print(err)
                    status_code = 500
            except Exception:
                    status_code = 400
                
cursor.close()
connection.close()
print(status_code)