"use client";

import { useState, useMemo } from 'react';
import type { Submission } from '@/lib/types';
import { SUBMISSIONS } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Home() {
  const [submissions, setSubmissions] = useState<Submission[]>(SUBMISSIONS);
  const [themeFilter, setThemeFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(submission => {
      const themeMatch = themeFilter === 'all' || submission.theme === themeFilter;
      const typeMatch = typeFilter === 'all' || submission.type === typeFilter;
      const ratingMatch = ratingFilter === 'all' || submission.rating === ratingFilter;
      return themeMatch && typeMatch && ratingMatch;
    });
  }, [submissions, themeFilter, typeFilter, ratingFilter]);

  const uniqueThemes = ['all', ...Array.from(new Set(SUBMISSIONS.map(s => s.theme)))];
  const uniqueTypes = ['all', ...Array.from(new Set(SUBMISSIONS.map(s => s.type)))];
  const uniqueRatings = ['all', ...Array.from(new Set(SUBMISSIONS.map(s => s.rating)))];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight lg:text-5xl">Public Feed</h1>
        <p className="mt-2 text-lg text-muted-foreground">Explore the creativity of our community.</p>
      </header>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center p-4 rounded-lg border bg-card">
        <Select value={themeFilter} onValueChange={setThemeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by theme" />
          </SelectTrigger>
          <SelectContent>
            {uniqueThemes.map(theme => <SelectItem key={theme} value={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            {uniqueTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            {uniqueRatings.map(rating => <SelectItem key={rating} value={rating}>{rating}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {filteredSubmissions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubmissions.map((submission) => (
            <Card key={submission.id} className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-headline">{submission.author}</CardTitle>
                <div className="flex gap-2 pt-2">
                  <Badge variant="secondary">{submission.theme}</Badge>
                  <Badge variant="outline">{submission.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-foreground/80 whitespace-pre-wrap">{submission.text}</p>
              </CardContent>
              <CardFooter>
                <CardDescription>{submission.rating} Content</CardDescription>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p>No submissions match the current filters.</p>
        </div>
      )}
    </div>
  );
}
