"use client";

import { useState } from "react";
import DashboardCard from "@/components/admin/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Upload,
  X,
  Save,
  Camera,
  MapPin,
  Phone,
  Mail,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [skills, setSkills] = useState(["React", "TypeScript", "Next.js", "Node.js"]);
  const [newSkill, setNewSkill] = useState("");
  const [profileCompletion, setProfileCompletion] = useState(85);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#B260E6]/10 to-[#ED84A5]/10">
            <User className="h-6 w-6 text-[#B260E6]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground mt-1">
              Manage your personal information and professional profile.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Profile Completion */}
      <DashboardCard title="Profile Completion" description="Complete your profile to increase your visibility">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Add your resume, complete your bio, and add skills to improve your profile.
          </p>
        </div>
      </DashboardCard>

      {/* Profile Picture */}
      <DashboardCard title="Profile Picture" description="Upload a professional profile photo">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-[#B260E6] to-[#ED84A5] text-white text-2xl font-bold shadow-lg">
              JD
            </div>
            <Button
              size="icon"
              variant="outline"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full border-2 border-background bg-background shadow-md hover:scale-105 transition-transform"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 space-y-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </Button>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or GIF. Max size of 2MB.
            </p>
          </div>
        </div>
      </DashboardCard>

      {/* Personal Information */}
      <DashboardCard title="Personal Information" description="Update your personal details">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="mr-2 inline h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                defaultValue="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                <Phone className="mr-2 inline h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+61 400 000 000"
                defaultValue="+61 400 000 000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">
              <MapPin className="mr-2 inline h-4 w-4" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="Sydney, Australia"
              defaultValue="Sydney, Australia"
            />
          </div>
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-[#B260E6] to-[#ED84A5] hover:from-[#A050D6] hover:to-[#DD74A5]">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </DashboardCard>

      {/* Bio/Summary */}
      <DashboardCard title="Professional Summary" description="Tell employers about yourself">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Write a brief summary about your professional experience and career goals..."
              className="min-h-32"
              defaultValue="Experienced frontend developer with 5+ years of expertise in React, TypeScript, and modern web technologies. Passionate about creating intuitive user interfaces and solving complex problems."
            />
            <p className="text-xs text-muted-foreground">
              {500} characters remaining
            </p>
          </div>
          <div className="flex justify-end">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Bio
            </Button>
          </div>
        </div>
      </DashboardCard>

      {/* Skills */}
      <DashboardCard title="Skills" description="Add your technical and professional skills">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-3 py-1.5 text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-1 rounded-full hover:bg-destructive/20 p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              className="flex-1"
            />
            <Button onClick={addSkill} variant="outline">
              Add
            </Button>
          </div>
        </div>
      </DashboardCard>

      {/* Resume/CV */}
      <DashboardCard title="Resume/CV" description="Upload your resume or CV">
        <div className="space-y-4">
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium mb-1">No resume uploaded</p>
              <p className="text-xs text-muted-foreground mb-4">
                PDF, DOC, DOCX. Max size of 5MB.
              </p>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Resume
              </Button>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button variant="ghost" size="sm">
              Download Current Resume
            </Button>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}

