#! /usr/bin/env bash


pip install argparse pandas mysql-connector-python

mysql -u root -p -e "CREATE DATABASE softeng2131"
mysql -u root -p softeng2131 < "database/build_database.sql"

