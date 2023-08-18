import { NextRequest, NextResponse } from 'next/server';
import {jwtVerify} from 'jose';




type Request =  NextRequest & {cookies:{token:string}};  

export async function middleware(request: Request) {
    const  token  = request.cookies.get("token")?.value as string;
    if (!token) {
        return NextResponse.json({ success: false, message: "Please login to continue" }, { status: 401 });
    }
         try {
            const username = await (await jwtVerify(token, new TextEncoder().encode("secret"))).payload.username;
            if(!username){
                request.nextUrl.pathname = "/api/error"
                return NextResponse.redirect(request.nextUrl);
            }
            if(request.url.includes("admin")) {
                if(username){
                    const res = await fetch("http://localhost:3000/api/admin/me",{method: "POST",headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({username})
                    })
                       const existingAdmin:any = await res.json()
                       console.log(existingAdmin)
                          if(!existingAdmin.username){
                            request.nextUrl.pathname = "/api/error"
                            console.log("admin error")
                            return NextResponse.redirect(request.nextUrl);
                          }
                          if(existingAdmin.username){
                            // console.log(JSON.parse(JSON.stringify(username)))
                            const reqheader = new Headers(request.headers);
                             reqheader.set("username", JSON.parse(JSON.stringify(username)))
                             
                            const response = NextResponse.next( {
                            request:{
                                headers: reqheader
                            }
                        } );
                        return response;
                           }
                    }
        }
        if(request.url.includes("user")) {
        if(username){
            const res = await fetch("http://localhost:3000/api/user/me",{method: "POST",headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({username})
            })
               const existingUser:any = await res.json()
               console.log(existingUser.username)
                  if(!existingUser.username){
                        console.log("user error")
                        request.nextUrl.pathname = "/api/error"
                    return NextResponse.redirect(request.nextUrl);
                  }
                  if(existingUser.username){
                    // console.log(JSON.parse(JSON.stringify(username)))
                    const reqheader = new Headers(request.headers);
                     reqheader.set("username", JSON.parse(JSON.stringify(username)))
                     
                    const response = NextResponse.next( {
                    request:{
                        headers: reqheader
                    }
                } );
                return response;
                   }
            }
            
            
        }
        } catch (error) {
            request.nextUrl.pathname = "/api/error"
            return NextResponse.redirect(request.nextUrl);
        }
        
}


export const config = {
    matcher: ["/api/admin/products", "/api/user/products"]
  }