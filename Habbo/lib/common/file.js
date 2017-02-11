/**
 * Copyright 2016 Jaden M.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Get a list of files in a directory and its subdirectories
 * using parallel and recursive file reading.
 * 
 * @param dir the directory we start searching in
 * @param filter exclude any files with certain name qualities
 * @param done the results, list of files by name
 */
function readFilesRecur(dir, filter, done) {
    let results = [];
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        list = filter(list);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach((file) => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    readFilesRecur(file, filter, (err, res) => {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

/**
 * Remove redundant and/or invalid files from the list.
 * File criteria requires certain file naming standards.
 * 
 * @param list files found in the directory
 * @returns {Array.<String>} filtered list
 */
function filterFiles(list) {
    return list.filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'sub');
    });
}

module.exports = {
    recursive: readFilesRecur,
    filter: filterFiles
};