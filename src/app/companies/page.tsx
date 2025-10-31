"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Users, Search, Building2, ArrowRight, Star, Heart, Filter } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

// Enhanced company data with Australian context and images
const companies = [
  {
    id: 1,
    name: "BuildRight Constructions",
    industry: "Construction & Masonry",
    location: "Sydney, NSW",
    employees: "500-1000",
    openJobs: 12,
    description: "Trusted construction company delivering residential and commercial masonry projects with precision and quality.",
    // NEW LINKS
    logo: "https://via.placeholder.com/100x100?text=BuildRight+Logo",
    coverImage: "/images/construction-company.png",
    rating: 4.8,
    featured: true,
    established: 1998
  },
  {
    id: 2,
    name: "Elite Electric Works",
    industry: "Electrical & Wiring",
    location: "Melbourne, VIC",
    employees: "100-200",
    openJobs: 10,
    description: "Leading electrical contracting firm specializing in wiring, power systems, and industrial installations.",
    // NEW LINKS
    logo: "https://via.placeholder.com/100x100?text=Elite+Electric+Logo",
    coverImage: "/images/electrician-company.png",
    rating: 4.6,
    featured: true,
    established: 2005
  },
  {
    id: 3,
    name: "FlowMaster Plumbing",
    industry: "Plumbing & Fittings",
    location: "Brisbane, QLD",
    employees: "200-500",
    openJobs: 15,
    description: "Expert plumbing company providing installation, repair, and maintenance services across major Australian cities.",
    // NEW LINKS
    logo: "https://via.placeholder.com/100x100?text=FlowMaster+Logo",
coverImage: "/images/plumber-company.png",
    rating: 4.9,
    featured: false,
    established: 2001
  },
  {
    id: 4,
    name: "PerfectFinish Painters",
    industry: "Painting & Finishing",
    location: "Perth, WA",
    employees: "50-100",
    openJobs: 6,
    description: "Professional painting and finishing services for homes, offices, and industrial spaces, ensuring flawless results.",
    // NEW LINKS
    logo: "https://via.placeholder.com/100x100?text=PerfectFinish+Logo",
    coverImage: "/images/painter-company.png",
    rating: 4.7,
    featured: false,
    established: 2012
  },
  {
    id: 5,
    name: "DrivePro Logistics",
    industry: "Driving & Logistics",
    location: "Adelaide, SA",
    employees: "300-600",
    openJobs: 9,
    description: "Reliable logistics company offering professional driving, delivery, and freight management solutions.",
    // NEW LINKS
    logo: "https://via.placeholder.com/100x100?text=DrivePro+Logo",
    coverImage: "/images/logistic-company.png",
    rating: 4.5,
    featured: false,
    established: 1995
  },
  {
    id: 6,
    name: "ChefConnect Kitchens",
    industry: "Culinary & Kitchen Staff",
    location: "Sydney, NSW",
    employees: "100-300",
    openJobs: 8,
    description: "Hospitality group providing expert culinary staff and chefs to top hotels, restaurants, and catering services.",
    // NEW LINKS
    logo: "https://via.placeholder.com/100x100?text=ChefConnect+Logo",
    coverImage: "/images/chef-company.png",
  rating: 4.8,
    featured: true,
    established: 2008
  },
  {
    id: 7,
    name: "CleanMate Services",
    industry: "Cleaning & Maintenance",
    location: "Melbourne, VIC",
    employees: "200-400",
    openJobs: 11,
    description: "Comprehensive cleaning and maintenance company serving commercial, industrial, and residential clients.",
    // NEW LINKS
    logo: "https://via.placeholder.com/100x100?text=CleanMate+Logo",
coverImage: "/images/cleaning-company.png",
    rating: 4.4,
    featured: false,
    established: 2010
  },
  {
    id: 8,
    name: "TailorWorks Studio",
    industry: "Tailoring & Textile",
    location: "Brisbane, QLD",
    employees: "50-100",
    openJobs: 7,
    description: "Professional tailoring and textile production company known for precision stitching and custom designs.",
    // NEW LINKS
    logo: "https://via.placeholder.com/100x100?text=TailorWorks+Logo",
    coverImage: "/images/tailer-company.png",
    rating: 4.9,
    featured: false,
    established: 2015
  },
  {
    id: 9,
    name: "SecureOne Guards",
    industry: "Security & Supervision",
    location: "Perth, WA",
    employees: "400-700",
    openJobs: 14,
    description: "Security agency providing trained guards, supervisors, and safety personnel for corporate and event security.",
    // NEW LINKS
    logo: "https://via.placeholder.com/100x100?text=SecureOne+Logo",
coverImage: "/images/security-company.png",
    rating: 4.6,
    featured: false,
    established: 2003
  }
];

const benefits = [
  {
    icon: "💰",
    title: "Competitive Salaries",
    description: "Top-tier compensation packages with industry-leading rates",
    image: "/images/salary.png"
  },
  {
    icon: "🚀",
    title: "Career Growth",
    description: "Work with leaders who prioritize your long-term success and advancement",
image: "/images/growth.png"
  },
  {
    icon: "🌴",
    title: "Work-Life Balance",
    description: "Flexible arrangements to enjoy the Australian lifestyle",
image: "/images/worklife.png"  },
  {
    icon: "📚",
    title: "Learning Budget",
    description: "Annual stipend for professional development and training",
    image: "/images/learning.png"
  },
  {
    icon: "❤️",
    title: "Health & Wellness",
    description: "Comprehensive medical, dental, and mental health support",
    image: "/images/health.png"
  },
  {
    icon: "👶",
    title: "Family Support",
    description: "Generous parental leave and childcare assistance programs",
    image: "/images/family.png"
  }
];

const stats = [
  { number: "2,000+", label: "Australian Companies", icon: "🏢" },
  { number: "50,000+", label: "Active Jobs", icon: "💼" },
  { number: "500,000+", label: "Candidates", icon: "👥" },
  { number: "95%", label: "Success Rate", icon: "🎯" }
];

const industries = ["All", "Construction & Masonry", "Electrical & Wiring", "Plumbing & Fittings", "Painting & Finishing", "Driving & Logistics", "Culinary & Kitchen Staff", "Cleaning & Maintenance", "Tailoring & Textile", "Security & Supervision"];

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [favoriteCompanies, setFavoriteCompanies] = useState<number[]>([]);

  const toggleFavorite = (companyId: number) => {
    setFavoriteCompanies(prev =>
      prev.includes(companyId)
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "All" || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[#B260E6] to-[#ED84A5] text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          {/* <Image
            // src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=873"
            // alt="Australian companies background"
            fill
            className="object-cover opacity-20"
            priority
          /> */}
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover Australia&apos;s{" "}
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Top Employers
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with leading Australian companies that value skilled trades and professional growth
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Search companies by name or industry..." 
                className="pl-12 h-14 text-lg rounded-xl border-0 focus:ring-2 focus:ring-white bg-white/20 backdrop-blur-sm text-white placeholder-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-4xl font-bold text-[#B260E6] mb-2">{stat.number}</div>
                <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Filters Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Featured <span className="text-[#B260E6]">Companies</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Discover {filteredCompanies.length} amazing companies hiring across Australia
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select 
                className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B260E6] outline-none appearance-none bg-white w-full sm:w-64"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <Card 
              key={company.id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {/* Company Cover Image */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={company.coverImage}
                  alt={`${company.name} cover`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Favorite Button */}
                <button 
                  onClick={() => toggleFavorite(company.id)}
                  className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <Heart 
                    className={`h-5 w-5 ${
                      favoriteCompanies.includes(company.id) 
                        ? "fill-[#ED84A5] text-[#ED84A5]" 
                        : "text-white"
                    }`} 
                  />
                </button>

                {/* Featured Badge */}
                {company.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[#ED84A5] text-white border-0 px-3 py-1">
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Company Logo */}
                {/* <div className="absolute -bottom-6 left-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
                      <Image
                        src={company.logo}
                        alt={`${company.name} logo`}
                        width={64}
                        height={64}
                        className="rounded-lg object-contain"
                      />
                    </div>
                  </div>
                </div> */}
              </div>

              <CardContent className="pt-8 pb-6">
                {/* Company Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-[#B260E6] transition-colors">
                      {company.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-[#B260E6] text-white border-0 text-xs">
                        {company.industry}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {company.rating}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {company.description}
                </p>

                {/* Company Details */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-[#ED84A5]" />
                    {company.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-[#ED84A5]" />
                    {company.employees} employees
                  </div>
                  <div className="flex items-center text-[#B260E6] font-semibold">
                    <Building2 className="h-4 w-4 mr-2" />
                    {company.openJobs} open positions
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-gradient-to-r from-[#B260E6] to-[#ED84A5] hover:from-[#A050D6] hover:to-[#DD74A5] text-white rounded-xl py-3 group/btn">
                  View Opportunities
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {filteredCompanies.length > 0 && (
          <div className="text-center mt-16">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-[#B260E6] text-[#B260E6] hover:bg-[#B260E6] hover:text-white rounded-full px-12 py-6"
            >
              Load More Companies
            </Button>
          </div>
        )}

        {/* No Results State */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No companies found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Try adjusting your search terms or browse all industries
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedIndustry("All");
              }}
              className="bg-gradient-to-r from-[#B260E6] to-[#ED84A5] hover:from-[#A050D6] hover:to-[#DD74A5] text-white rounded-full px-8"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      {/* Enhanced Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Work With <span className="text-[#ED84A5]">Australian Companies?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join companies that invest in their employees&apos; growth, well-being, and work-life balance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B260E6] to-[#ED84A5] rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                      {benefit.icon}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#B260E6] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#B260E6] to-[#ED84A5] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Company Match?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of skilled professionals who found their dream workplace through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-[#B260E6] hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-full">
              Create Company Profile
            </Button>
            <Button className="bg-transparent border-2 border-white text-white hover:bg-white/20 font-semibold px-8 py-4 text-lg rounded-full">
              Browse All Jobs
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}