import { useState, useEffect, useRef } from 'react';
import { 
  Shield, User, Plus, Trash2, Save, LogOut, 
  Mail, MapPin, Linkedin, Github, Twitter, 
  GraduationCap, Briefcase, Code, Star, ChevronUp,
  Lock, CheckCircle, AlertCircle, Camera, Edit3,
  Eye, EyeOff, Timer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster, toast } from 'sonner';
import './App.css';

// Types
interface Skill {
  id: string;
  name: string;
  progress: number;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  skills: string[];
  image?: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  date: string;
  description: string;
  activities?: string;
  grade?: string;
  skills: string[];
  image?: string;
}

interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  skills: string[];
  image?: string;
}

interface SocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
}

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  subtitle: string;
  description: string;
}

// Initial Data
const initialPersonalInfo: PersonalInfo = {
  name: 'Aashis Sapkota',
  title: 'IT & Cybersecurity Student',
  email: 'sapkotaaashis62@gmail.com',
  subtitle: 'Building the Future of Tech Security',
  description: 'Passionate about technology, cybersecurity, and solving real-world problems through innovation.'
};

const initialSkills: Skill[] = [
  { id: '1', name: 'Research Skills', progress: 90 },
  { id: '2', name: 'Microsoft Excel', progress: 85 },
  { id: '3', name: 'Analytical Skills', progress: 88 },
  { id: '4', name: 'Adobe Photoshop', progress: 70 },
  { id: '5', name: 'Technical Support', progress: 75 },
  { id: '6', name: 'Problem Solving', progress: 92 },
  { id: '7', name: 'Python', progress: 80 },
  { id: '8', name: 'SQL', progress: 78 },
];

const initialExperience: Experience[] = [
  {
    id: '1',
    title: 'Personal Care Assistant',
    company: 'Clayton Church Homes · Part-time',
    location: 'Australia · On-site',
    date: 'Aug 2023 - Present · 2 yrs 7 mos',
    description: 'As a personal carer, I gained excellent technical flexibility, problem-solving, and customer service abilities that I can use in an IT support position. I ensured effective care and user assistance by using accessible technology, communicating clearly, and managing thorough documentation.',
    skills: ['Analytical Skills', 'Communication', 'Problem Solving'],
    image: ''
  }
];

const initialEducation: Education[] = [
  {
    id: '1',
    institution: 'University of the Sunshine Coast',
    degree: "Bachelor's degree, Information and Communication Technology",
    date: 'Jul 2025 - Jul 2027',
    description: "I've officially begun my journey into the world of tech through the Bachelor of Information and Communications Technology at USC. This program is helping me build strong foundations in programming, networking, databases, cybersecurity, and systems analysis.",
    activities: 'Engaged in student-led IT projects and workshops • Active in cybersecurity and networking study groups',
    grade: '',
    skills: [],
    image: ''
  },
  {
    id: '2',
    institution: 'Southern Academy of Business and Technology - SABT',
    degree: 'Diploma and Advanced Diploma in IT',
    date: 'Nov 2022 - Apr 2025',
    description: 'Passionate about technology and cybersecurity, I have completed a Diploma and Advanced Diploma of IT from Southern Academy, where I developed a strong foundation in programming, databases, and IT systems.',
    grade: 'Completed',
    skills: ['Analytical Skills', 'Presentations', 'Python', 'SQL', 'Microsoft Excel', 'Power BI'],
    image: ''
  }
];

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Hardware Store Inventory System',
    date: 'Sep 2025 - Oct 2025',
    description: 'I built a Hardware Store Inventory System as a university project that shows how programming can solve real problems in retail. For customers, it makes shopping simple they can browse products like walking through store aisles, check prices and availability, add items to their cart, and get a proper receipt at checkout.',
    skills: ['Python', 'OOP', 'Database Design', 'Testing'],
    image: ''
  },
  {
    id: '2',
    title: 'Intelligent Home Environment Control',
    date: 'Sep 2025 - Oct 2025',
    description: 'Developed an Intelligent Home Environment Control system as a university project using a Raspberry Pi 4. The system automates lighting and comfort based on real time presence and environmental data.',
    skills: ['Python', 'Raspberry Pi', 'IoT', 'Sensors'],
    image: ''
  }
];

const initialSocialLinks: SocialLinks = {
  linkedin: '',
  github: '',
  twitter: ''
};

// Security Configuration
const SECURITY_CONFIG = {
  password: 'Admin@2024!',
  maxAttempts: 3,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes
  sessionDuration: 30 * 60 * 1000, // 30 minutes
  codeExpiry: 5 * 60 * 1000 // 5 minutes
};

function App() {
  // State
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialPersonalInfo);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [experience, setExperience] = useState<Experience[]>(initialExperience);
  const [education, setEducation] = useState<Education[]>(initialEducation);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(initialSocialLinks);
  const [profileImage, setProfileImage] = useState<string>('');
  const [aboutText, setAboutText] = useState<string>(`Hi! I'm beginning my journey in IT, with a strong interest in tech support, cybersecurity, and networking. I've completed a Diploma and Advanced Diploma in IT, and I'm now studying for my Bachelor of Information Technology.

I'm learning to troubleshoot technical issues, assist users with IT problems, and understand how systems work. I've started exploring Python, Power BI, and Tableau, and I'm excited to keep growing my knowledge.

I enjoy helping people and solving problems, and I'm looking forward to gaining hands-on experience in IT support roles like Help Desk or Level 1 Technician.`);

  // Admin State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStep, setAuthStep] = useState<'password' | 'code'>('password');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number>(0);
  const [sessionExpiry, setSessionExpiry] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Scroll to top visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.personalInfo) setPersonalInfo(parsed.personalInfo);
        if (parsed.skills) setSkills(parsed.skills);
        if (parsed.experience) setExperience(parsed.experience);
        if (parsed.education) setEducation(parsed.education);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.socialLinks) setSocialLinks(parsed.socialLinks);
        if (parsed.profileImage) setProfileImage(parsed.profileImage);
        if (parsed.aboutText) setAboutText(parsed.aboutText);
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  // Save data to localStorage
  const saveToLocalStorage = () => {
    const data = {
      personalInfo,
      skills,
      experience,
      education,
      projects,
      socialLinks,
      profileImage,
      aboutText
    };
    localStorage.setItem('portfolioData', JSON.stringify(data));
    toast.success('All changes saved successfully!');
  };

  // Session timer
  useEffect(() => {
    if (!isAuthenticated || sessionExpiry === 0) return;

    const interval = setInterval(() => {
      const remaining = sessionExpiry - Date.now();
      if (remaining <= 0) {
        handleLogout();
        toast.info('Session expired. Please login again.');
      } else {
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        setTimeRemaining(`${mins}:${secs.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, sessionExpiry]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auth Functions
  const handlePasswordSubmit = () => {
    if (lockoutUntil > Date.now()) {
      const mins = Math.ceil((lockoutUntil - Date.now()) / 60000);
      toast.error(`Account locked. Try again in ${mins} minutes.`);
      return;
    }

    if (password === SECURITY_CONFIG.password) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      setAuthStep('code');
      toast.success(`Verification code: ${code}`, { duration: 10000 });
      setTimeout(() => {
        toast.info('Verification code expired. Please request a new one.');
        setGeneratedCode('');
      }, SECURITY_CONFIG.codeExpiry);
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      if (newAttempts >= SECURITY_CONFIG.maxAttempts) {
        const lockoutTime = Date.now() + SECURITY_CONFIG.lockoutDuration;
        setLockoutUntil(lockoutTime);
        toast.error('Too many failed attempts. Account locked for 15 minutes.');
      } else {
        toast.error(`Invalid password. ${SECURITY_CONFIG.maxAttempts - newAttempts} attempts remaining.`);
      }
    }
  };

  const handleCodeSubmit = () => {
    const enteredCode = verificationCode.join('');
    if (enteredCode === generatedCode && generatedCode !== '') {
      setIsAuthenticated(true);
      setSessionExpiry(Date.now() + SECURITY_CONFIG.sessionDuration);
      setIsAuthOpen(false);
      setAuthStep('password');
      setPassword('');
      setVerificationCode(['', '', '', '', '', '']);
      setLoginAttempts(0);
      toast.success('Login successful!');
    } else {
      toast.error('Invalid verification code.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminOpen(false);
    setSessionExpiry(0);
    setTimeRemaining('');
    toast.success('Logged out successfully.');
  };

  const handleCodeInput = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    if (value && index < 5) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  // Image Upload Functions
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (image: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        callback(event.target?.result as string);
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Add/Edit/Delete Functions
  const addSkill = () => {
    setSkills([...skills, { id: Date.now().toString(), name: 'New Skill', progress: 50 }]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: string | number) => {
    setSkills(skills.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const addExperience = () => {
    setExperience([...experience, {
      id: Date.now().toString(),
      title: 'New Position',
      company: 'Company Name',
      location: 'Location',
      date: 'Date Range',
      description: 'Description...',
      skills: [],
      image: ''
    }]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    setExperience(experience.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const deleteExperience = (id: string) => {
    setExperience(experience.filter(e => e.id !== id));
  };

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now().toString(),
      institution: 'New Institution',
      degree: 'Degree',
      date: 'Date Range',
      description: 'Description...',
      activities: '',
      grade: '',
      skills: [],
      image: ''
    }]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string | string[]) => {
    setEducation(education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const deleteEducation = (id: string) => {
    setEducation(education.filter(e => e.id !== id));
  };

  const addProject = () => {
    setProjects([...projects, {
      id: Date.now().toString(),
      title: 'New Project',
      date: 'Date Range',
      description: 'Description...',
      skills: [],
      image: ''
    }]);
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Toaster position="top-right" richColors />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold transform rotate-3 hover:rotate-12 transition-transform">
                AS
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'About', 'Experience', 'Education', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all group-hover:w-full" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Button */}
      <button
        onClick={() => isAuthenticated ? setIsAdminOpen(true) : setIsAuthOpen(true)}
        className={`fixed top-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 ${
          isAuthenticated 
            ? 'bg-green-500 text-white animate-pulse' 
            : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white'
        }`}
      >
        <Shield className="w-6 h-6" />
      </button>

      {/* Session Timer */}
      {isAuthenticated && timeRemaining && (
        <div className="fixed top-24 right-24 z-50 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-green-200 flex items-center gap-2">
          <Timer className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">{timeRemaining}</span>
        </div>
      )}

      {/* Auth Dialog */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Admin Login
            </DialogTitle>
          </DialogHeader>
          
          {authStep === 'password' ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-500 text-center">{personalInfo.email}</p>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                  className="pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button onClick={handlePasswordSubmit} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                <Lock className="w-4 h-4 mr-2" />
                Send Verification Code
              </Button>
              {loginAttempts > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>
                    {SECURITY_CONFIG.maxAttempts - loginAttempts} attempts remaining
                  </AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-slate-500 text-center">Enter 6-digit verification code</p>
              <div className="flex justify-center gap-2">
                {verificationCode.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => { codeInputRefs.current[index] = el; }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeInput(index, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold"
                  />
                ))}
              </div>
              <Button onClick={handleCodeSubmit} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                Verify & Login
              </Button>
              <Button variant="ghost" onClick={() => setAuthStep('password')} className="w-full">
                Back to Password
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Admin Panel */}
      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                Admin Panel
              </span>
              <div className="flex items-center gap-2">
                <Button onClick={saveToLocalStorage} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save All
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-[calc(90vh-120px)]">
            <Tabs defaultValue="profile" className="p-6">
              <TabsList className="grid grid-cols-6 mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Profile Photo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      {profileImage && (
                        <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-2xl object-cover" />
                      )}
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, setProfileImage)}
                          className="mb-2"
                        />
                        <p className="text-sm text-slate-500">Max 5MB. JPG, PNG supported.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Name</label>
                        <Input
                          value={personalInfo.name}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Title</label>
                        <Input
                          value={personalInfo.title}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <Input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Subtitle</label>
                      <Input
                        value={personalInfo.subtitle}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, subtitle: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Description</label>
                      <Textarea
                        value={personalInfo.description}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, description: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Linkedin className="w-5 h-5" />
                      Social Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">LinkedIn</label>
                      <Input
                        value={socialLinks.linkedin}
                        onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">GitHub</label>
                      <Input
                        value={socialLinks.github}
                        onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Twitter</label>
                      <Input
                        value={socialLinks.twitter}
                        onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit3 className="w-5 h-5" />
                      About Me
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={aboutText}
                      onChange={(e) => setAboutText(e.target.value)}
                      rows={15}
                      className="font-mono text-sm"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Skills ({skills.length})</h3>
                  <Button onClick={addSkill} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                </div>
                {skills.map((skill) => (
                  <Card key={skill.id}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-5">
                          <Input
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                            placeholder="Skill name"
                          />
                        </div>
                        <div className="col-span-5">
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              value={skill.progress}
                              onChange={(e) => updateSkill(skill.id, 'progress', parseInt(e.target.value) || 0)}
                              className="w-20"
                            />
                            <Progress value={skill.progress} className="flex-1" />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <Button variant="destructive" size="sm" onClick={() => deleteSkill(skill.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Experience ({experience.length})</h3>
                  <Button onClick={addExperience} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
                {experience.map((exp) => (
                  <Card key={exp.id}>
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Title</label>
                          <Input
                            value={exp.title}
                            onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Company</label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Location</label>
                          <Input
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Date</label>
                          <Input
                            value={exp.date}
                            onChange={(e) => updateExperience(exp.id, 'date', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Image</label>
                        <div className="flex items-center gap-4">
                          {exp.image && (
                            <img src={exp.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (img) => updateExperience(exp.id, 'image', img))}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Skills (comma separated)</label>
                        <Input
                          value={exp.skills.join(', ')}
                          onChange={(e) => updateExperience(exp.id, 'skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        />
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => deleteExperience(exp.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Experience
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Education ({education.length})</h3>
                  <Button onClick={addEducation} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </div>
                {education.map((edu) => (
                  <Card key={edu.id}>
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Institution</label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Degree</label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Date</label>
                          <Input
                            value={edu.date}
                            onChange={(e) => updateEducation(edu.id, 'date', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Grade</label>
                          <Input
                            value={edu.grade}
                            onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <Textarea
                          value={edu.description}
                          onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Activities</label>
                        <Input
                          value={edu.activities}
                          onChange={(e) => updateEducation(edu.id, 'activities', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Image</label>
                        <div className="flex items-center gap-4">
                          {edu.image && (
                            <img src={edu.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (img) => updateEducation(edu.id, 'image', img))}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Skills (comma separated)</label>
                        <Input
                          value={edu.skills.join(', ')}
                          onChange={(e) => updateEducation(edu.id, 'skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        />
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => deleteEducation(edu.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Education
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Projects ({projects.length})</h3>
                  <Button onClick={addProject} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </div>
                {projects.map((proj) => (
                  <Card key={proj.id}>
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Title</label>
                          <Input
                            value={proj.title}
                            onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Date</label>
                          <Input
                            value={proj.date}
                            onChange={(e) => updateProject(proj.id, 'date', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <Textarea
                          value={proj.description}
                          onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Image</label>
                        <div className="flex items-center gap-4">
                          {proj.image && (
                            <img src={proj.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (img) => updateProject(proj.id, 'image', img))}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Skills (comma separated)</label>
                        <Input
                          value={proj.skills.join(', ')}
                          onChange={(e) => updateProject(proj.id, 'skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        />
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => deleteProject(proj.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Project
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 opacity-5" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
            <div className="space-y-6">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-2 text-sm">
                <GraduationCap className="w-4 h-4 mr-2" />
                {personalInfo.title}
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {personalInfo.name.split(' ')[0]}
                </span>
                <br />
                <span className="text-slate-800">
                  {personalInfo.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 font-medium">
                {personalInfo.subtitle}
              </p>
              
              <p className="text-slate-500 text-lg leading-relaxed">
                {personalInfo.description}
              </p>
              
              <div className="flex gap-4">
                {socialLinks.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                     className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all hover:scale-110">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {socialLinks.github && (
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"
                     className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-800 hover:text-white transition-all hover:scale-110">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                     className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-400 hover:text-white transition-all hover:scale-110">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[2rem] rotate-6 opacity-20" />
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                  {profileImage ? (
                    <img src={profileImage} alt={personalInfo.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <User className="w-32 h-32 text-slate-300" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">About Me</h2>
            <p className="text-slate-500 text-lg">{personalInfo.title} | Tech Enthusiast</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="prose prose-lg text-slate-600">
              {aboutText.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
              ))}
              <p className="mt-6 text-blue-600 font-semibold flex items-center gap-2">
                <Star className="w-5 h-5" />
                Open to learning and collaborating!
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Code className="w-6 h-6 text-blue-600" />
                Top Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-slate-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-slate-700">{skill.name}</span>
                      <span className="text-sm text-slate-500">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Experience</h2>
            <p className="text-slate-500 text-lg">My professional journey and hands-on experience</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="space-y-8">
            {experience.map((exp) => (
              <Card key={exp.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-4 gap-0">
                    {exp.image && (
                      <div className="md:col-span-1 h-48 md:h-auto">
                        <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className={`p-6 ${exp.image ? 'md:col-span-3' : 'md:col-span-4'}`}>
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">{exp.title}</h3>
                          <p className="text-slate-500 flex items-center gap-2 mt-1">
                            <Briefcase className="w-4 h-4" />
                            {exp.company}
                          </p>
                          <p className="text-slate-400 text-sm flex items-center gap-2 mt-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {exp.date}
                        </Badge>
                      </div>
                      <p className="text-slate-600 leading-relaxed mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="bg-slate-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Education</h2>
            <p className="text-slate-500 text-lg">My academic background and qualifications</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="space-y-8">
            {education.map((edu) => (
              <Card key={edu.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-4 gap-0">
                    {edu.image && (
                      <div className="md:col-span-1 h-48 md:h-auto">
                        <img src={edu.image} alt={edu.institution} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className={`p-6 ${edu.image ? 'md:col-span-3' : 'md:col-span-4'}`}>
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">{edu.institution}</h3>
                          <p className="text-slate-500 flex items-center gap-2 mt-1">
                            <GraduationCap className="w-4 h-4" />
                            {edu.degree}
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          {edu.date}
                        </Badge>
                      </div>
                      {edu.grade && (
                        <Badge className="bg-green-100 text-green-700 mb-4">
                          <Star className="w-3 h-3 mr-1" />
                          Grade: {edu.grade}
                        </Badge>
                      )}
                      {edu.activities && (
                        <p className="text-blue-600 text-sm mb-4 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {edu.activities}
                        </p>
                      )}
                      <p className="text-slate-600 leading-relaxed mb-4">{edu.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {edu.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="bg-slate-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Projects</h2>
            <p className="text-slate-500 text-lg">Some of my recent work and technical projects</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <Card key={proj.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                {proj.image ? (
                  <div className="h-48 overflow-hidden">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Code className="w-16 h-16 text-slate-300" />
                  </div>
                )}
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-700">
                    {proj.date}
                  </Badge>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{proj.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{proj.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="bg-slate-50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
            <p className="text-slate-300 text-lg">I'm open to learning, collaborating, and growing in technology!</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-8">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const email = formData.get('email');
                  const message = formData.get('message');
                  window.location.href = `mailto:${personalInfo.email}?subject=Message from ${name}&body=${message}%0D%0A%0D%0AFrom: ${email}`;
                }} className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    required
                  />
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    required
                  />
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="flex justify-center gap-6 mt-8">
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                   className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {socialLinks.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"
                   className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-slate-700 transition-all hover:scale-110">
                  <Github className="w-6 h-6" />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                   className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-400 transition-all hover:scale-110">
                  <Twitter className="w-6 h-6" />
                </a>
              )}
              <a href={`mailto:${personalInfo.email}`}
                 className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition-all hover:scale-110">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            {personalInfo.name}
          </h3>
          <p className="text-slate-400 mb-6">{personalInfo.title} | Technology Enthusiast | Learning by Doing</p>
          <Separator className="bg-slate-800 my-6" />
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-xl transition-all hover:scale-110 ${
          showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
}

export default App;
