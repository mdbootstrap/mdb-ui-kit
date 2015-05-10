#!/bin/bash
# This script automates color customization bootstrap material design
# This script use "lessc", install first:
# npm install -g less

# author: @arturu
# author name: Pietro Arturo Panetta
# email: arturu@arturu.it
# license GLP3 

# This program is free software: you can redistribute it and/or modify it under 
# the terms of the GNU General Public License as published by the Free Software 
# Foundation, either version 3 of the License, or (at your option) any later 
# version.

# This program is distributed in the hope that it will be useful, but WITHOUT 
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS 
# FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

# You should have received a copy of the GNU General Public License along with 
# this program. If not, see http://www.gnu.org/licenses/gpl-3.0.html.

color=$1
tempFile="custom-color-palette.less"
pathOut="dist/custom"

# script settings
text_color_red="\e[0;31m"
text_color_green="\e[0;32m"
text_color_blue="\e[0;34m"
text_bold=`tput bold`
text_reset=`tput sgr0`
text_tag_error=$(echo -e ${text_color_red}${text_bold}[Error]${text_reset})
text_tag_success=$(echo -e ${text_color_green}${text_bold}[Success]${text_reset})
# end script settings

# check param
if [[ $color == "" ]]
 then
  echo -e "$text_tag_error missing param. Use:
   ./custom-color-palette.sh <color>
   ${text_color_green}./custom-color-palette.sd deep-purple${text_reset}
   for color follow: http://www.google.com/design/spec/style/color.html#color-color-palette
   Run the script in the root of material design packange"
  exit
fi

# check if they are in the root of material design packange
if [ ! -f 'bower.json' ]
 then
  echo -e "$text_tag_error Run the script in the root of material design packange. Exit."
  exit
fi

# read line packange name
linePackName=$(sed -n '2p' 'bower.json' | awk '{split($0,array,":")} END{print array[2]}' | sed -r 's/[", ]+//g')

if [[ $linePackName != 'bootstrap-material-design' ]]
 then
  echo -e "$text_tag_error It is not the right package. Exit."
  exit
fi

# generate $tempFile
echo "@import \"less/material.less\";

// Override @primary color with one took from _colors.less
// http://www.google.com/design/spec/style/color.html#color-color-palette

@primary: @$color;
" > $tempFile

# check $tempFile
if [ ! -f $tempFile ]
 then
  echo -e "$text_tag_error $tempFile not writed. Exit."
  exit
fi

echo -e "$text_color_green Compiling material design... $text_reset"

# check $pathOut
if [ ! -d $pathOut ]
 then
  mkdir $pathOut
fi

# compiling
lessc -x $tempFile > $pathOut/$color.css

# check file $color.css
if [ ! -f $pathOut/$color.css ]
 then
  echo -e "$text_tag_error ${text_color_blue}$pathOut/$color.css${text_reset} not writed"
  exit
fi

# remove temp file
yes | rm $tempFile

#end message
echo -e "$text_tag_success Use ${text_color_blue}$pathOut/$color.css${text_reset} instead of dist/css/material.css"
