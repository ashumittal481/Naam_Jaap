"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { DailyStat } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader, BarChart3, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";


export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [stats, setStats] = useState<DailyStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      const statsRef = collection(db, `users/${user.uid}/daily_stats`);
      const q = query(statsRef);
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const statsData: DailyStat[] = [];
        querySnapshot.forEach((doc) => {
          statsData.push({ id: doc.id, ...doc.data() } as DailyStat);
        });
        setStats(statsData);
        setIsLoading(false);
      }, (error) => {
        console.error("Error fetching daily stats:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch your progress data. Please try again later.",
        });
        setIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user, toast]);
  
  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <Loader className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading Profile...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Should be redirected by the effect
  }

  const totalMalas = stats.reduce((acc, stat) => acc + stat.malaCount, 0);

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Back to Dashboard</span>
            </Link>
          </Button>
          <h1 className="font-headline text-3xl font-bold text-foreground">
            Your Sadhana Profile
          </h1>
          <div className="w-10" />
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Email:</strong> {user.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Daily Progress</CardTitle>
                <CardDescription>Total Malas Completed: {totalMalas}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {stats.length > 0 ? (
                <ScrollArea className="h-[400px]">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Malas Completed</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {stats.map((stat) => (
                            <TableRow key={stat.id}>
                            <TableCell>{new Date(stat.date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                            <TableCell className="text-right font-bold text-accent">{stat.malaCount}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                You haven&apos;t completed any malas yet. Start chanting to see your progress!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
