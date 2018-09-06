#start server & remove dist
..$ npm start server

#node upgrade - use following command to upgrade node to version 8
nvm use --delete-prefix v8.10.0
(if nvm not found add following to the profile: 
    #NVM runner
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
)

Theme:
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC186661/