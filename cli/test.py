import mysql.connector
import os
import unittest

# Class to implement unit tests
class TestStringMethods(unittest.TestCase):

    def test_healthcheck(self):
        print(1)
        os.system("python se2131.py healthcheck > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
    def test_resetpasses(self):
        print(2)
        os.system("python se2131.py resetpasses > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
    def test_resetstations(self):
        print(3)
        os.system("python se2131.py resetstations > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
    def test_resetvehicles(self):
        print(4)
        os.system("python se2131.py resetvehicles > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
    def test_passesperstation(self):
        print(5)
        os.system("python se2131.py passesperstation --station AO09 --datefrom 20200101 --dateto 20200131 " +
            "--format csv  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
        os.system("python se2131.py passesperstation --station AO09 --datefrom 20200101 --dateto 20200131 " +
            "--format wrongformat  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 400)
        f.close()
    def test_passesanalysis(self):
        print(6)
        os.system("python se2131.py passesanalysis --op1 kentirki_odos --op2 olympia_odos --datefrom 20200101 " +
            "--dateto 20200131 --format csv  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
        os.system("python se2131.py passesanalysis --op1 kentirki_odos --op2 olympias_odos --datefrom 20200101 " +
            "--dateto 20200131 --format wrongformat  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 400)
        f.close()
    def test_passescost(self):
        print(7)
        os.system("python se2131.py passescost --op1 olympia_odos --op2 kentriki_odos --datefrom 20200101 " +
            "--dateto 20200131 --format csv  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
        os.system("python se2131.py passescost --op1 olympia_odos --op2 kentriki_odos --datefrom 20200101 " +
            "--dateto 20200131 --format wrongformat  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 400)
        f.close()
    def test_chargesby(self):
        print(8)
        os.system("python se2131.py chargesby --op1 kentriki_odos --datefrom 20201001 --dateto 20201031 " +
            "--format csv > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
        os.system("python se2131.py chargesby --op1 kentriki_odos --datefrom 20201001 " +
            "--dateto 20201031 --format wrongformat  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 400)
        f.close()
    def test_admin(self):
        print(9)
        # Insert and then delete dummy data
        os.system("python se2131.py admin --passesupd --source passes.csv > .tmp")
        try:
            connection =  mysql.connector.connect(
                host="localhost",
                user="root",
                password="panoplos",
                database="softeng2131"
            )
        except mysql.connector.Error as e:
            print(e)
        cursor = connection.cursor()
        cursor.execute("DELETE FROM passes where passID = 'WSI3219900'")
        connection.commit()
        cursor.close()
        connection.close()

        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
        os.system("python se2131.py admin --passesupd --source 0246236788.csv > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 400)
        f.close()


if __name__ == '__main__':
    unittest.main() # simply call all tests
