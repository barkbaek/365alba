ADDRESS=$1

if [ -z $ADDRESS ]; then
  ADDRESS="15.164.224.117:9200"
fi

# Check that Elasticsearch is running
curl -s "http://$ADDRESS" 2>&1 > /dev/null
if [ $? != 0 ]; then
    echo "Unable to contact Elasticsearch at $ADDRESS"
    echo "Please ensure Elasticsearch is running and can be reached at http://$ADDRESS/"
    exit -1
fi

echo "WARNING, 365alba Indexes - Let's delete companies, resumes, albaboard, albareview AND re-index!"
echo "취소하려면 [Control-C] 누르세요."
echo
echo "계속하려면 [엔터] 누르세요."
read

curl -s -XDELETE "$ADDRESS/companies" > /dev/null
curl -s -XDELETE "$ADDRESS/resumes" > /dev/null
curl -s -XDELETE "$ADDRESS/albaboard" > /dev/null
curl -s -XDELETE "$ADDRESS/ceoboard" > /dev/null
curl -s -XDELETE "$ADDRESS/albareview" > /dev/null

echo
echo "Successfully deleted companies, resumes, albaboard, albareview Indexes!"

echo
echo "Creating companies Index..."
curl -s -XPUT "$ADDRESS/companies" -H "Content-Type: application/json" -d@$(dirname $0)/es_companies_mapping.json
curl -s "$ADDRESS/companies/_health?wait_for_status=yellow&timeout=10s" > /dev/null
echo
echo "Successfully created companies Index."

echo
echo "Creating resumes Index..."
curl -s -XPUT "$ADDRESS/resumes" -H "Content-Type: application/json" -d@$(dirname $0)/es_resumes_mapping.json
curl -s "$ADDRESS/resumes/_health?wait_for_status=yellow&timeout=10s" > /dev/null
echo
echo "Successfully created resumes Index."

echo
echo "Creating albaboard Index..."
curl -s -XPUT "$ADDRESS/albaboard" -H "Content-Type: application/json" -d@$(dirname $0)/es_albaboard_mapping.json
curl -s "$ADDRESS/albaboard/_health?wait_for_status=yellow&timeout=10s" > /dev/null
echo
echo "Successfully created albaboard Index."

echo
echo "Creating albareview Index..."
curl -s -XPUT "$ADDRESS/ceoboard" -H "Content-Type: application/json" -d@$(dirname $0)/es_albareview_mapping.json
curl -s "$ADDRESS/albareview/_health?wait_for_status=yellow&timeout=10s" > /dev/null
echo
echo "Successfully created albareview Index."

# echo
# echo "node.js를 시작합니다!"

# node.js 시작
# ./node_modules/.bin/nodemon index.js