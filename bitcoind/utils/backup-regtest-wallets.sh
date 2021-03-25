# Save wallets
FILENAME='listRegWallets.txt'
/home/ubuntu/bitcoin-0.20.0/bin/bitcoin-cli -regtest -rpcwallet=1 listwallets > $FILENAME

# Iterate
for k in $(jq '.[]' $FILENAME); do
        if [ "$k" == \"\" ]; then
                continue
        fi
        walletName=${k%\"}
        walletName=${walletName#\"}
        folder="$(pwd)/backups/$(date +%s)"
        filename="$folder/$walletName.dump"

        mkdir -p $folder

        /home/ubuntu/bitcoin-0.20.0/bin/bitcoin-cli -regtest -rpcwallet=$walletName dumpwallet $filename
done | column -t -s$'\t'

# Remove tmp file
rm $FILENAME
