import { getRandomUsers } from '@/actions/user.action'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card';
import Link from 'next/link';
import { Avatar, AvatarImage } from './avatar';
import FollowButton from './FollowButton';


async function WhoToFollow() {

    const users = await getRandomUsers();
    if(users.length === 0) return null;

    
    return (
        <Card className="border-custom-purple-200 dark:border-custom-purple-900">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-custom-purple-600 dark:text-custom-purple-400">
              Who to Follow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between group hover:bg-custom-purple-50 dark:hover:bg-custom-purple-900/20 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Link href={`/profile/${user.username}`}>
                      <Avatar className="h-10 w-10 border-2 border-custom-purple-200 dark:border-custom-purple-800">
                        <AvatarImage src={user.image ?? "/avatar.png"} />
                      </Avatar>
                    </Link>
                    <div className="flex flex-col">
                      <Link 
                        href={`/profile/${user.username}`} 
                        className="font-medium text-sm hover:text-custom-purple-600 dark:hover:text-custom-purple-400 transition-colors"
                      >
                        {user.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">@{user.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {user._count.followers.toLocaleString()} followers
                      </p>
                    </div>
                  </div>
                  <FollowButton 
                    userId={user.id} 
                    
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )
}

export default WhoToFollow