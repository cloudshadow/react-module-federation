



```javascript
//babel-node.js
process.on('SIGINT', function() {
  proc.kill("SIGINT");
  process.exit(0); // process.exit(1); change 1->0 to remove error when kill the process
});
```


```
// From a terminal, issue the following to run MongoDB (i.e. the mongod process) in the foreground.
mongod --config /usr/local/etc/mongod.conf
```

###sequelize-auto
https://github.com/sequelize/sequelize-auto

npm install -g sequelize-auto
npm install -g tedious

mongodump -o /Users/cloudshadow/Documents/workspace/Express/
mongodump -o /Users/cloudshadow/Documents/workspace/Express/ --username cloudshadow --password Dominos1215
mongorestore -d store_scheduling /Users/cloudshadow/Documents/store_scheduling