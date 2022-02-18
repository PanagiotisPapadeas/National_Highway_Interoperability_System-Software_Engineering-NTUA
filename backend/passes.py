import pandas as pd
import datetime


passes = pd.read_csv("passes.csv")
stations = pd.read_csv("sampledata01_stations.csv")
vehicles = pd.read_csv("sampledata01_vehicles_100.csv")

###########################

#dictionary in the form: {stationID: operator}
stationID = stations['stationID'].tolist()
operator = stations['stationProvider'].tolist()

dic_sta_op = dict(zip(stationID, operator)) 

operator = []
stationID = passes['stationID'].tolist()
for s in stationID:
	operator.append(dic_sta_op[s])

passes["operatorID1"] = operator #add data to operatorID1 column

###########################

#dictionary in the form: {vehicleID: tagID}
vehicleID = vehicles['vehicleID'].tolist()
tagID = vehicles['tagID'].tolist()

dic_veh_tag = dict(zip(vehicleID, tagID)) 

tagID = []
vehicleID = passes['vehicleID'].tolist()
for v in vehicleID:
	tagID.append(dic_veh_tag[v])

passes["tagID"] = tagID #add data to tagID column

###########################

stationID = []
for t in tagID:
	stationID.append(t[0] + t[1] + "00")
operator2 = []
for s in stationID:
	operator2.append(dic_sta_op[s])

passes["operatorID2"] = operator2 #add data to operatorID2 column

###########################

pass_type = []

for op1, op2 in zip(operator, operator2):
	if op1 == op2:
		pass_type.append("home")
	else:
		pass_type.append("visitor")

passes["pass_type"] = pass_type

###########################

passes = passes.set_index('passID') #add data to pass_type column


###########################

old_dt = passes["timestamp"]
new_dt = []
for dt in old_dt:
	new_dt.append(datetime.datetime.strftime(datetime.datetime.strptime(dt,'%d/%m/%Y %H:%M'), '%Y-%m-%d %H:%M:%S'))

passes["timestamp"] = new_dt

###########################

print(passes.head)
passes.to_csv('passes2.csv')