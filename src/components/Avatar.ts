// color array taken from vue3-avatar to get the same results for the same input, else I would rather calculate the number
import m from 'mithril'
import { LinkedUser } from '../models/LinkedUser'

interface Attrs {
  user: LinkedUser
}

const lightColors = 
  'F0F8FF,FAEBD7,00FFFF,7FFFD4,F0FFFF,F5F5DC,FFE4C4,FFEBCD,DEB887,5F9EA0,7FFF00,D2691E,FF7F50,6495ED,FFF8DC,00FFFF,B8860B,A9A9A9,A9A9A9,BDB76B,FF8C00,E9967A,8FBC8F,00CED1,FF1493,00BFFF,1E90FF,FFFAF0,FF00FF,DCDCDC,F8F8FF,FFD700,DAA520,808080,808080,ADFF2F,F0FFF0,FF69B4,CD5C5C,FFFFF0,F0E68C,E6E6FA,FFF0F5,7CFC00,FFFACD,ADD8E6,F08080,E0FFFF,FAFAD2,D3D3D3,D3D3D3,90EE90,FFB6C1,FFA07A,20B2AA,87CEFA,B0C4DE,FFFFE0,00FF00,32CD32,FAF0E6,FF00FF,66CDAA,BA55D3,9370D8,3CB371,7B68EE,00FA9A,48D1CC,F5FFFA,FFE4E1,FFE4B5,FFDEAD,FDF5E6,FFA500,FF4500,DA70D6,EEE8AA,98FB98,AFEEEE,D87093,FFEFD5,FFDAB9,CD853F,FFC0CB,DDA0DD,B0E0E6,FF0000,BC8F8F,FA8072,F4A460,FFF5EE,C0C0C0,87CEEB,FFFAFA,00FF7F,D2B48C,D8BFD8,FF6347,40E0D0,EE82EE,F5DEB3,FFFFFF,F5F5F5,FFFF00,9ACD32' 
  .split(',')

const darkColors = 
  '000000,0000FF,8A2BE2,A52A2A,DC143C,00008B,008B8B,006400,8B008B,556B2F,9932CC,8B0000,483D8B,2F4F4F,2F4F4F,9400D3,696969,696969,B22222,228B22,008000,4B0082,800000,0000CD,C71585,191970,000080,808000,6B8E23,800080,4169E1,8B4513,2E8B57,A0522D,6A5ACD,708090,708090,4682B4,008080'
  .split(',')

export class Avatar implements m.ClassComponent<Attrs> {
  asciiValue(user: LinkedUser): number {
    let input = user.getUsername()
    let ascii = 0;
    for (let index = 0; index < input.length; index++)
      ascii += input.charCodeAt(index);
    return ascii;
  }

  lightColor(ascii:number): string {
    return `#${darkColors[ascii % darkColors.length]}`
  }

  view({attrs: {user}}: m.CVnode<Attrs>) {
    return m(
      '.app-avatar.d-flex.justify-content-center.align-items-center.rounded-circle',
      {style: {width: '42px', height: '42px', 'background-color': this.lightColor(this.asciiValue(user)), 'text-transform': 'uppercase'}},
      m('span.font-medium', {style: {'font-size': '16.8px', 'line-height': 1, color: 'white' }}, user.getInitials())
    )
  }
}
