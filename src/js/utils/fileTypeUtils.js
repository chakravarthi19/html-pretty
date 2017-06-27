/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Checks if a file is of a particular type by regexing the file name and
// expecting a certain extension.
const hasAllowedFileExtension = (expectedType, filePath, jsbeautifyConfig) => {
  for (const extension of jsbeautifyConfig[expectedType].allowed_file_extensions || []) {
    if (filePath.match(new RegExp(`\\.${extension}$`, 'i'))) {
      return true;
    }
  }
  return false;
};

// Checks if a file is of a particular type by regexing the syntax name and
// expecting a pattern.
const hasAllowedFileSyntax = (expectedType, fileSyntax, jsbeautifyConfig) => {
  for (const pattern of jsbeautifyConfig[expectedType].allowed_file_syntaxes || []) {
    if (fileSyntax.toLowerCase().includes(pattern)) {
      return true;
    }
  }
  return false;
};

export const isCSS = (fileSyntax, filePath, jsbeautifyConfig) => {
  // If file unsaved, there's no good way to determine whether or not it's
  // CSS based on the file contents, so just bail.
  if (filePath === '?') {
    return false;
  }
  if (fileSyntax === '?') {
    return hasAllowedFileExtension('css', filePath, jsbeautifyConfig);
  }
  return hasAllowedFileSyntax('css', fileSyntax, jsbeautifyConfig);
};

export const isHTML = (fileSyntax, filePath, bufferContents, jsbeautifyConfig) => {
  // If file unsaved, check if first non-whitespace character is &lt;
  if (filePath === '?') {
    return bufferContents.match(/^\s*</);
  }
  if (fileSyntax === '?') {
    return hasAllowedFileExtension('html', filePath, jsbeautifyConfig);
  }
  return hasAllowedFileSyntax('html', fileSyntax, jsbeautifyConfig);
};

export const isJS = (fileSyntax, filePath, bufferContents, jsbeautifyConfig) => {
  // If file unsaved, check if first non-whitespace character is NOT &lt;
  if (filePath === '?') {
    return !bufferContents.match(/^\s*</);
  }
  if (fileSyntax === '?') {
    return hasAllowedFileExtension('js', filePath, jsbeautifyConfig);
  }
  return hasAllowedFileSyntax('js', fileSyntax, jsbeautifyConfig);
};
