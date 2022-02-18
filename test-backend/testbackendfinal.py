import mysql.connector

class colors:
	HEADER = '\033[95m'
	OKBLUE = '\033[94m'
	OKCYAN = '\033[96m'
	OKGREEN = '\033[92m'
	WARNING = '\033[93m'
	FAIL = '\033[91m'
	ENDC = '\033[0m'
	BOLD = '\033[1m'
	UNDERLINE = '\033[4m'

mydb = mysql.connector.connect(
  host = "localhost",
  user = "root",
  password = "panoplos",
  database = "softeng2131"
)

#1.Passes per station
mycursor = mydb.cursor()
passes_per_station = "select passID, timestamp, vehicleID, tag_provider, pass_type, amount from passes, tags where passes.tagID = tags.tagID and stationID = 'AO09' and timestamp >= '2020-01-01 00:00:00' and timestamp <= '2020-01-31 23:59:59'"
mycursor.execute(passes_per_station)
myresult1 = mycursor.fetchall()

#2.Passes analysis
passes_analysis = "select passID, stationID, timestamp, vehicleID, amount from passes where pass_type = 'visitor' and operatorID1 = 'kentriki_odos' and operatorID2 = 'olympia_odos' and timestamp >= '2020-01-01 00:00:00' and timestamp <= '2020-01-31 23:59:59'"
mycursor.execute(passes_analysis)
myresult2 = mycursor.fetchall()

#3.Passes cost: operator2 ows to operator1
passes_cost = "select count(*) as NumberofPasses, sum(amount) as PassesCost from passes where operatorID1 = 'olympia_odos' and operatorID2 = 'kentriki_odos' and timestamp >= '2020-10-01 00:00:00' and timestamp <= '2020-10-31 23:59:59'"
mycursor.execute(passes_cost)
myresult3 = mycursor.fetchall()

#3.Passes cost: operator1 ows to operator2
passes_cost = "select count(*) as NumberofPasses, sum(amount) as PassesCost from passes where operatorID1 = 'kentriki_odos' and operatorID2 = 'olympia_odos' and timestamp >= '2020-10-01 00:00:00' and timestamp <= '2020-10-31 23:59:59'"
mycursor.execute(passes_cost)
myresult5 = mycursor.fetchall()

#4.Charges by
charges_by = "select operatorID2, count(*) as NumberOfPasses, sum(amount) as PassesCost from passes where operatorID1 = 'kentriki_odos' and timestamp >= '2020-10-01 00:00:00' and timestamp <= '2020-10-31 23:59:59' group by operatorID2"
mycursor.execute(charges_by)
myresult4 = mycursor.fetchall()



#1.print(myresult1)
if((myresult1[0][5]) == 3.1):
	print ("PASSESPS amount: " + colors.OKGREEN + "SUCCESS" + colors.ENDC) 
else: print("PASSESPS" + colors.FAIL + "FAIL" + colors.ENDC)

#2.print(myresult2)
if((myresult2[0][1]) == "KO09"): 
	print ("PASSESANALYSIS station " + colors.OKGREEN + "SUCCESS" + colors.ENDC)
else: print("PASSESANALYSIS" + colors.FAIL + "FAIL" + colors.ENDC)

if((myresult2[0][4]) == 2.2): 
	print ("PASSESANALYSIS amount " + colors.OKGREEN + "SUCCESS" + colors.ENDC)
else: 
	print("PASSESANALYSIS" + colors.FAIL + "FAIL" + colors.ENDC)

#3.print(myresult3)
if (myresult3[0][0] == 7): 
	print ("PASSESCOST NumberOfPasses is 7 " + colors.OKGREEN + "SUCCESS" + colors.ENDC)
else: 
	print("PASSESCOST" + colors.FAIL + "FAIL" + colors.ENDC)

if (myresult3[0][1] > 13.799 and myresult3[0][1] < 13.801): 
	print ("PASSESCOST cost from KO to OO is 13.8 " + colors.OKGREEN + "SUCCESS" + colors.ENDC)
else: 
	print ("PASSESCOST" + colors.FAIL + "FAIL" + colors.ENDC)

#3.print(myresult5)
if (myresult5[0][1] > 8.849 and myresult5[0][1] < 8.851): 
	print ("PASSESCOST cost from OO to KO is 8.85 " + colors.OKGREEN + "SUCCESS" + colors.ENDC)
else: 
	print ("PASSESCOST" + colors.FAIL + "FAIL" + colors.ENDC)

#4.print(myresult4)
if (myresult4[1][2] > 7.099 and myresult4[1][2] < 7.101): 
	print ("CHARGESBY cost from egnatia to kentriki is 7.1 " + colors.OKGREEN + "SUCCESS" + colors.ENDC)
else: 
	print ("CHARGESBY" + colors.FAIL + "FAIL" + colors.ENDC)