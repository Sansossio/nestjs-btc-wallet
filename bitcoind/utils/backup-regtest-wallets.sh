# Save wallets
FILENAME='listRegWallets.txt'
/home/ubuntu/bitcoin-0.20.0/bin/bitcoin-cli -regtest -rpcwallet=1 listwallets > $FILENAME

# Iterate
for k in $(jq '.[]' $FILENAME); do
        if [ "$k" == \"\" ]; then
                continue
        fi
        folder="$(pwd)/backups/$(date +%s)/$k"
        walletName=${k%\"}
        walletName=${walletName#\"}
        filename="$folder/$walletName.dump"

        mkdir -p $folder

        /home/ubuntu/bitcoin-0.20.0/bin/bitcoin-cli -regtest -rpcwallet=$walletName dumpwallet $filename
done | column -t -s$'\t'

# Remove tmp file
rm $FILENAME
