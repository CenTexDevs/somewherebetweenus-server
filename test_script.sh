#!/bin/bash

echo ""
echo "add user"
curl -l "http://localhost:1337/Meeting/addguest?nickname=rob&meetingid=4434&latitude=30.5&longitude=-97.6"
echo ""
echo "list users"
curl -l "http://localhost:1337/Meeting/getguests?meetingid=4434"
echo ""
echo "remove user"
curl -l "http://localhost:1337/Meeting/removeguest?nickname=rob&meetingid=4434"
echo ""
echo "list users"
curl -l "http://localhost:1337/Meeting/getguests?meetingid=4434"
