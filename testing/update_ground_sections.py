import psycopg2

import json
with open("sections/sunderland.json") as f:
    data = json.load(f)

# Database connection
conn = psycopg2.connect(
    dbname="footballticketshub",
    user="ticketshop",
    password="ticketshop1432",
    host="ticketshopdbinstance.c1c4mugucvo4.eu-west-2.rds.amazonaws.com",
    port="5432"
)

cursor = conn.cursor()

stadium_id = '6ec78f85-1270-43c1-a615-61fc0c114fc5'  # hardcoded or pass dynamically
team = 'Sunderland'

for stand in data:
    stand_name = stand["name"]
    tier = stand.get("tier", "Unknown")  # fallback if no tier provided

    for section in stand["sections"]:
        section_name = section["name"]
  

        print(f"Inserting section '{section_name}' under stand '{stand_name}'")

        cursor.execute("""
            INSERT INTO g_sections 
            (stadium_id, section_name, stand_name, tier,team)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (section_id) DO NOTHING
        """, (
            stadium_id,
            section_name,
            stand_name,
            tier,    
            team
        ))

conn.commit()
cursor.close()
conn.close()

print("✅ Insertions complete.")