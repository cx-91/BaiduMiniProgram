#!/bin/bash
export PATH=$PATH:`pwd`"/../../node_modules/.bin/"
echo "*******扩展组件基础库编译*****"
echo "node: $(node -v)"
echo "npm: v$(npm -v)"
echo `which babel`
cd src
for file in $(ls -d */)
do
    echo ${file}
    cd ${file%*/}
    if [[ "${file%*/}" != "common" ]]
    then
        npm run build --silent
    fi
    cd ..
done
exit