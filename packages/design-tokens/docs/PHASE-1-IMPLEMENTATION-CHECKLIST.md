# ✅ Phase 1 Implementation Checklist

**Objective:** Single source of truth + Automated CI/CD  
**Timeline:** 2 weeks (Dec 25 - Jan 8)  
**Status:** Ready for Implementation  

---

## 👀 Pre-Implementation Review

- [ ] Team read `PHASE-1-MIGRATION.md`
- [ ] Design System lead approved PR #39
- [ ] Frontend lead signed off on workflow
- [ ] DevOps/CI-CD person reviewed GitHub Actions
- [ ] Q&A team ready for testing
- [ ] Timeline confirmed with stakeholders

---

## 📟 Week 1: Validation & Local Testing

### Day 1-2: Setup & Local Validation

- [ ] Merge PR #39 to main
- [ ] Pull latest: `git pull origin main`
- [ ] Install: `cd packages/design-tokens && npm ci`
- [ ] Run validation: `npm run tokens:validate`
  - Expected: ✅ All tokens validated successfully
- [ ] Run build: `npm run tokens:build`
  - Expected: ✅ CSS files generated in `styles/generated/`

### Day 2-3: Test Validation Script

#### Test Case 1: Invalid JSON

```bash
# Create invalid JSON
echo '{invalid json}' > tokens/test-invalid.json

# Run validation
npm run tokens:validate

# Expected: ❌ "Invalid JSON" error
# Cleanup
rm tokens/test-invalid.json
```

- [ ] Test passed

#### Test Case 2: Missing Value

```bash
# Create token without value
echo '{
  "dyn": {
    "test": { "color": {} }
  }
}' > tokens/test-missing-value.json

# Run validation
npm run tokens:validate

# Expected: ❌ "missing value" error
# Cleanup
rm tokens/test-missing-value.json
```

- [ ] Test passed

#### Test Case 3: Duplicate Names

```bash
# Add duplicate to existing file
echo '{
  "dyn": {
    "responsiveTabs": {
      "color": { "value": "#000" }
    }
  }
}' > tokens/test-duplicate.json

# Run validation
npm run tokens:validate

# Expected: ❌ "duplicate token" error
# Cleanup
rm tokens/test-duplicate.json
```

- [ ] Test passed

#### Test Case 4: Valid Token

```bash
# Create valid token
echo '{
  "dyn": {
    "testToken": {
      "color": { "value": "#FF0000" }
    }
  }
}' > tokens/test-valid.json

# Run validation
npm run tokens:validate

# Expected: ✅ All tokens validated
# Cleanup
rm tokens/test-valid.json
```

- [ ] Test passed

### Day 4-5: Storybook Testing

- [ ] Start Storybook: `npm run storybook`
- [ ] Check light theme renders correctly
  - [ ] Colors correct
  - [ ] Typography correct
  - [ ] Spacing correct
  - [ ] All components visible
- [ ] Switch to dark mode
  - [ ] Colors override correctly
  - [ ] Contrast maintained
  - [ ] No broken styles
- [ ] Test dark mode switch in browser DevTools
  - Open DevTools → Rendering → Emulate CSS media feature → prefers-color-scheme → dark
  - [ ] All components update correctly
- [ ] Close Storybook

---

## 🔄 Week 2: GitHub Actions & Team Training

### Day 1-2: GitHub Actions Testing

#### Test 1: Manual Token Change

```bash
# Create feature branch
git checkout -b test/token-change

# Edit a token (e.g., button color)
vim tokens/components/button.json
# Change a value, e.g., "#0066cc" → "#FF6600"

# Commit and push
git add tokens/components/button.json
git commit -m "test: change button color"
git push origin test/token-change
```

- [ ] Token change pushed
- [ ] Wait for GitHub Actions workflow to trigger
- [ ] Check workflow: https://github.com/mgasic/dyn-ui-main-v01/actions
- [ ] Verify all steps passed:
  - [ ] Checkout
  - [ ] Setup Node
  - [ ] Install dependencies
  - [ ] Validate tokens ✅
  - [ ] Generate CSS ✅
  - [ ] Run tests ✅
  - [ ] Auto-commit generated files ✅
  - [ ] Workflow summary ✅

#### Test 2: Verify Generated Files

```bash
# Create PR with the test branch
# Go to https://github.com/mgasic/dyn-ui-main-v01/compare/test/token-change
# Create PR

# Pull the branch locally
git fetch origin
git checkout test/token-change

# Verify generated files were auto-committed
cat styles/generated/button-like.css

# Look for: --dyn-button-color: #FF6600; (new value)
# Expected: ✅ New value is there
```

- [ ] Generated files updated correctly
- [ ] Auto-commit worked
- [ ] Test PR can be closed without merge

### Day 2-3: Validation Failure Testing

#### Test 3: Intentional Validation Failure

```bash
# Create new feature branch
git checkout -b test/invalid-token

# Create invalid token
echo '{
  "dyn": {
    "badToken": {
      "color": { }
    }
  }
}' > tokens/invalid-test.json

# Commit and push
git add tokens/invalid-test.json
git commit -m "test: invalid token (should fail)"
git push origin test/invalid-token
```

- [ ] Workflow triggered
- [ ] Expected: ❌ Workflow fails at validation step
- [ ] Check failure reason: "Token has no value"
- [ ] Cleanup:
  ```bash
  git reset --hard HEAD~1
  git push -f origin test/invalid-token
  # Delete test branch
  ```

### Day 3-4: Team Training

- [ ] Schedule team meeting (30 min)
- [ ] Walk through PHASE-1-MIGRATION.md
  - [ ] Show before/after workflow
  - [ ] Explain validation rules
  - [ ] Demo GitHub Actions workflow
- [ ] Q&A session
  - [ ] Address concerns
  - [ ] Clarify dark theme behavior
  - [ ] Document special cases
- [ ] Distribute migration guide to team
- [ ] Create team Slack/email with key points

### Day 5: Final Verification

- [ ] All test branches cleaned up
- [ ] Main branch has all Phase 1 code
- [ ] GitHub Actions workflow active on main
- [ ] Team confident with new process
- [ ] Documentation complete and links verified
- [ ] No regression in existing tokens

---

## 🦆 Testing Checklist

### Validation Script

- [ ] Validates JSON syntax
- [ ] Catches missing values
- [ ] Enforces naming conventions
- [ ] Finds duplicate tokens
- [ ] Provides clear error messages
- [ ] Passes valid tokens without errors

### GitHub Actions Workflow

- [ ] Triggers on token file changes
- [ ] Triggers on config changes
- [ ] Validates tokens before build
- [ ] Generates CSS correctly
- [ ] Runs test suite
- [ ] Auto-commits generated files
- [ ] Creates workflow summary
- [ ] No invalid commits
- [ ] Works on both main and develop

### Documentation

- [ ] PHASE-1-MIGRATION.md complete
- [ ] AUTOMATION-GUIDE.md updated
- [ ] PHASE-2-TESTING.md provided as reference
- [ ] PHASE-1-IMPLEMENTATION-CHECKLIST.md (this file)
- [ ] All links correct
- [ ] Examples work correctly

### Team Readiness

- [ ] Team understands new workflow
- [ ] Team knows when CI/CD runs
- [ ] Team knows how to fix validation errors
- [ ] Team knows never to commit generated files
- [ ] Team knows to commit only tokens/ JSON changes
- [ ] Questions answered

---

## 🐛 Troubleshooting During Testing

### Validation Always Fails

**Symptoms:** Validation fails on every token

**Causes:**
- Node modules not installed
- chalk dependency missing
- Invalid script path

**Fix:**
```bash
cd packages/design-tokens
npm ci
npm run tokens:validate
```

### GitHub Actions Not Triggering

**Symptoms:** Push to main, no workflow runs

**Causes:**
- Workflow file syntax error
- Branch protection rules
- Workflow disabled

**Fix:**
```bash
# Check workflow file syntax
cat .github/workflows/design-tokens-generate.yml

# Check Actions tab for errors
# https://github.com/mgasic/dyn-ui-main-v01/actions
```

### Auto-commit Not Working

**Symptoms:** Files generated but not committed

**Causes:**
- Git auto-commit action configuration
- Permission issues
- File patterns not matching

**Fix:**
- Check workflow logs for `git-auto-commit-action` step
- Verify file pattern matches: `packages/design-tokens/styles/generated/**`
- Check if files actually changed

---

## ⚠️ Important Notes

### Never Commit Generated Files Manually

```bash
# ❌ WRONG - GitHub Actions will overwrite these
git add styles/generated/
git commit -m "Update generated files"

# ✅ RIGHT - Only commit token changes
git add tokens/
git commit -m "Update tokens"
# GitHub Actions auto-commits generated files
```

### Validation Runs Before Build

Token validation now happens automatically:

```bash
# This runs validation first
npm run tokens:build

# Is equivalent to
npm run tokens:validate && style-dictionary build ...
```

### Dark Theme Testing

When testing dark theme:

1. Open browser DevTools (F12)
2. Go to Rendering tab
3. Find "Emulate CSS media feature preference"
4. Select "prefers-color-scheme: dark"
5. Refresh page
6. Verify colors changed (but readability maintained)

---

## 📈 Metrics & Success Criteria

### Phase 1 Success Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Validation Coverage | 4 rules | 🛐 Ready |
| CI/CD Automation | 100% | 🛐 Ready |
| Test Coverage | 90%+ | 🛑 Phase 2 |
| Documentation | 3 guides | 🛐 Ready |
| Team Readiness | 100% | 🛑 Week 2 |
| Zero Manual Errors | 100% | 🛑 Week 2 |

### Phase 1 Completion Criteria

✅ All validation tests passed  
✅ GitHub Actions workflow active  
✅ Auto-commits working  
✅ Team trained and confident  
✅ No regressions in tokens  
✅ Documentation complete  
✅ Ready for Phase 2  

---

## 👤 Role Responsibilities

### Design System Lead
- [ ] Review and approve implementation
- [ ] Monitor workflow for issues
- [ ] Oversee team training
- [ ] Approve progression to Phase 2

### Frontend Leads
- [ ] Test tokens in components
- [ ] Verify dark mode behavior
- [ ] Ensure no regressions
- [ ] Provide feedback

### DevOps/CI-CD
- [ ] Setup workflow permissions
- [ ] Monitor GitHub Actions
- [ ] Debug workflow failures
- [ ] Maintain CI/CD infrastructure

### QA Team
- [ ] Test validation script
- [ ] Verify workflow steps
- [ ] Test failure scenarios
- [ ] Ensure process is bulletproof

### Documentation
- [ ] Verify guide clarity
- [ ] Test example commands
- [ ] Update FAQs based on feedback
- [ ] Maintain Phase 2 documentation

---

## 🚀 Next Steps After Phase 1

**Immediately After Merge:**
1. Team uses new workflow
2. Monitor for issues
3. Document any edge cases
4. Gather feedback

**Week 2-3 Planning:**
1. Review Phase 1 success
2. Start Phase 2 planning
3. Allocate resources
4. Set Phase 2 timeline

**Phase 2 (Weeks 3-4):**
- Dark mode test suite
- TOKEN_USAGE_GUIDE.md
- Troubleshooting guide
- Test coverage reporting

---

**Status:** ✅ Phase 1 Ready for Implementation  
**Next:** Begin Week 1 checklist  
**Questions?** Contact Design System lead
