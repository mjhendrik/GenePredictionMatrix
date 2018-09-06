#Initial installation
- Clone git.
- Add node_modules of package.json by running in the application root:  ..$ npm i 

#Start server & remove dist
..$ npm start server

#Run project at: http://localhost:3011/

#node upgrade - use following command to upgrade node to version 8
nvm use --delete-prefix v8.10.0
(if nvm not found add following to the profile: 
    #NVM runner
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
)

Theme:
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC186661/