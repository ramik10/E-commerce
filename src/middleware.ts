import { NextRequest, NextResponse } from 'next/server';
import {jwtVerify} from 'jose';




type Request =  NextRequest & {cookies:{token:string}};  

export async function middleware(request: Request) {
    const  token  = request.cookies.get("token")?.value as string;
    if (!token) {
         request.nextUrl.pathname = "/api/error"
                return NextResponse.redirect(request.nextUrl);
    }
         try {
            const username = await (await jwtVerify(token, new TextEncoder().encode("secret"))).payload.username;
            if(!username){
                request.nextUrl.pathname = "/api/error"
                return NextResponse.redirect(request.nextUrl);
            }
            if(request.url.includes("admin")) {
                if(username){
                    request.nextUrl.pathname = "/api/user/me"
                    const res = await fetch(request.nextUrl,{method: "POST",headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({username})
                    })
                       const existingAdmin:any = await res.json()
                          if(!existingAdmin.username){
                            request.nextUrl.pathname = "/api/error"
                            return NextResponse.redirect(request.nextUrl);
                          }
                          if(existingAdmin.username){
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
            request.nextUrl.pathname = "/api/user/me"
            const res = await fetch(request.nextUrl,{method: "POST",headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({username})
            })
               const existingUser:any = await res.json()
                  if(!existingUser.username){
                        request.nextUrl.pathname = "/api/error"
                    return NextResponse.redirect(request.nextUrl);
                  }
                  if(existingUser.username){
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
    matcher: ["/api/admin/products", "/api/user/products/:path*", "/api/user/products" ,  "/api/user/PurchasedProducts", "/api/me"]
  }
